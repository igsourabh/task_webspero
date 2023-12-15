import { Router } from "express";
import { Login, Register, Update, getAllUsers, getLoggedinUser, logout } from "../../controller/User";
import authenticateToken from "../../middleware/auth";

const router = Router();

router.post("/", Register);
router.post("/login", Login);
router.get("/", authenticateToken, getAllUsers);
router.put("/", authenticateToken, Update);
router.get("/loggedinuser", authenticateToken, getLoggedinUser);
router.post("/logout", authenticateToken, logout);

export default router;
