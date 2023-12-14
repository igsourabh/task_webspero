"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedinUser = exports.Login = exports.Update = exports.Register = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../../schema/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var kms = 70;
        const currentUser = yield User_1.default.findById(req.user);
        const find = (yield User_1.default.find({
            _id: { $ne: req.user },
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [currentUser === null || currentUser === void 0 ? void 0 : currentUser.long, currentUser === null || currentUser === void 0 ? void 0 : currentUser.lat],
                    },
                    $maxDistance: kms * 1000,
                },
            },
        }).sort({ createdAt: -1 }));
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: find,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.getAllUsers = getAllUsers;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const find = yield User_1.default.findOne({ email });
        if (find) {
            return res.status(409).json({
                STATUS_MESSAGE: "ERROR",
                STATUS_RESPONSE: "User with same email is already exists",
            });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashpassword = yield bcryptjs_1.default.hash(password, salt);
        req.body.password = hashpassword;
        console.log(req.body);
        const create = yield User_1.default.create(req.body);
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: create,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.Register = Register;
const Update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield User_1.default.findById(req.user);
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
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashpassword = yield bcryptjs_1.default.hash(req.body.password, salt);
            req.body.password = hashpassword;
        }
        // console.log(req.body);
        const update = yield User_1.default.findByIdAndUpdate(req.user, req.body, {
            new: true,
        });
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: update,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.Update = Update;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const find = (yield User_1.default.findOne({ email }));
        if (!find) {
            return res.status(404).json({
                STATUS_MESSAGE: "ERROR",
                STATUS_RESPONSE: "Invalid email or password",
            });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, find.password);
        if (!passwordMatch) {
            return res.status(401).json({
                STATUS_MESSAGE: "ERROR",
                STATUS_RESPONSE: "Invalid email or password",
            });
        }
        // console.log(find.id);
        const token = jsonwebtoken_1.default.sign({ user: find.id }, "atombomb");
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: token,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.Login = Login;
const getLoggedinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield User_1.default.findById(req.user);
        res.status(200).json({
            STATUS_MESSAGE: "SUCCESS",
            STATUS_RESPONSE: find,
        });
    }
    catch (error) {
        res.status(500).json({
            STATUS_MESSAGE: "FAILURE",
            STATUS_RESPONSE: error.message,
        });
    }
});
exports.getLoggedinUser = getLoggedinUser;
