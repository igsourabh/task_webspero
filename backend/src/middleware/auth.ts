import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export interface AuthenticatedRequest extends Request {
    user?: string;
  }
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  jwt.verify(token, "atombomb", (err, user:any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }

    req.user = user.user;
    next();
  });
};

export default authenticateToken;
