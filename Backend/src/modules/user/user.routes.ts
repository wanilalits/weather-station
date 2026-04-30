import express from "express";
import {   checkUser } from "./user.controller";

const router = express.Router();

router.get("/user", checkUser);

export default router;

