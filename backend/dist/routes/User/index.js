"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../../controller/User");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/", User_1.Register);
router.post("/login", User_1.Login);
router.get("/", auth_1.default, User_1.getAllUsers);
router.put("/", auth_1.default, User_1.Update);
router.get("/loggedinuser", auth_1.default, User_1.getLoggedinUser);
exports.default = router;
