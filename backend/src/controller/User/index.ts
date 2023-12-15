import { Request, Response } from "express";
import UserModel from "../../schema/User";
import { Users } from "./types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../middleware/auth";
let array: any = [];
export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    var kms = 70;
    const currentUser = await UserModel.findById(req.user);
    const find: Users[] = (await UserModel.find({
      _id: { $in: array, $ne: req.user },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [currentUser?.long, currentUser?.lat],
          },
          $maxDistance: kms * 1000,
        },
      },
    })
      .limit(5)
      .sort({ createdAt: -1 })) as Users[];
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      STATUS_RESPONSE: find,
    });
  } catch (error: any) {
    res.status(500).json({
      STATUS_MESSAGE: "FAILURE",
      STATUS_RESPONSE: error.message,
    });
  }
};

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const find = await UserModel.findOne({ email });
    if (find) {
      return res.status(409).json({
        STATUS_MESSAGE: "ERROR",
        STATUS_RESPONSE: "User with same email is already exists",
      });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
      req.body.password = hashpassword;
    }

    const create = await UserModel.create(req.body);
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      STATUS_RESPONSE: create,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      STATUS_MESSAGE: "FAILURE",
      STATUS_RESPONSE: error.message,
    });
  }
};
export const Update = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const find = await UserModel.findById(req.user);
    if (!find) {
      return res.status(404).json({
        STATUS_MESSAGE: "ERROR",
        STATUS_RESPONSE: "user not found",
      });
    }
    if (find.id !== req.user) {
      return res.status(401).json({
        STATUS_MESSAGE: "ERROR",
        STATUS_RESPONSE: "unable to access this route",
      });
    }
    if (req.body.password && req.body.password.trim() !== "") {
      console.log(req.body.password);
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashpassword;
    }
    // console.log(req.body);
    const update = await UserModel.findByIdAndUpdate(req.user, req.body, {
      new: true,
    });
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      STATUS_RESPONSE: update,
    });
  } catch (error: any) {
    res.status(500).json({
      STATUS_MESSAGE: "FAILURE",
      STATUS_RESPONSE: error.message,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const find: Users = (await UserModel.findOne({ email })) as Users;
    if (!find) {
      return res.status(404).json({
        STATUS_MESSAGE: "ERROR",
        STATUS_RESPONSE: "Invalid email or password",
      });
    }
    const passwordMatch = await bcrypt.compare(password, find.password);
    if (!passwordMatch) {
      return res.status(401).json({
        STATUS_MESSAGE: "ERROR",
        STATUS_RESPONSE: "Invalid email or password",
      });
    }

    const isUserInArray = array.find((user: string) => user === find.id);
    if (!isUserInArray) {
      array.unshift(find.id);
    }
    console.log(array);

    const token = jwt.sign({ user: find.id }, "atombomb");
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      STATUS_RESPONSE: token,
    });
  } catch (error: any) {
    res.status(500).json({
      STATUS_MESSAGE: "FAILURE",
      STATUS_RESPONSE: error.message,
    });
  }
};

export const getLoggedinUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const find = await UserModel.findById(req.user);
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      STATUS_RESPONSE: find,
    });
  } catch (error: any) {
    res.status(500).json({
      STATUS_MESSAGE: "FAILURE",
      STATUS_RESPONSE: error.message,
    });
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = array.filter((e: any) => e !== req.user);

    array = data;
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      STATUS_RESPONSE: "logout",
    });
  } catch (error: any) {
    res.status(500).json({
      STATUS_MESSAGE: "FAILURE",
      STATUS_RESPONSE: error.message,
    });
  }
};
