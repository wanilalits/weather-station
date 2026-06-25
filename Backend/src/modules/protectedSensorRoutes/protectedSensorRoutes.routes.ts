import express from "express";
import {  getLogs } from "./protectedSensorRoutes.controller";
import { verifyToken } from '../../middleware/auth.middleware';
const router = express.Router();


router.get("/device_log/protected", verifyToken, getLogs);
export default router;



/* import express from "express";
import { getProfile} from "./protected.controller";
const router = express.Router();

import { verifyToken } from '../../middleware/auth.middleware';
router.get("/profileview", verifyToken, getProfile);
router.post("/profile", verifyToken, getProfile);


export default router; */