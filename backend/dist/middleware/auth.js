"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Token missing" });
    }
    jsonwebtoken_1.default.verify(token, "atombomb", (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden - Invalid token" });
        }
        req.user = user.user;
        next();
    });
};
exports.default = authenticateToken;
