import express from "express";
import { checkUser, registerUser, userLogin } from "./user.controller";

const router = express.Router();

router.get("/user", checkUser);
// Register User
router.post("/register", registerUser);
router.post("/login", userLogin);
export default router;

