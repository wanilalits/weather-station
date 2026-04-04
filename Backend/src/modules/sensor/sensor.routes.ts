import express from "express";
import { createLog, getLogs } from "./sensor.controller";

const router = express.Router();

router.post("/device_log", createLog);
router.get("/device_log", getLogs);

export default router;




router.post("/device_log", createLog);