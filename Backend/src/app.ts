import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();
import sensorRoutes from "./modules/sensor/sensor.routes";
import userRoutes from "./modules/user/user.routes";
import protectedRoutes from "./modules/protected/protected.routes";
import protectedSensorRoutes from "./modules/protectedSensorRoutes/protectedSensorRoutes.routes";
import { initWebSocket } from "./websocket/wsServer";
import http from "http";
import cors from "cors";
import { common } from "./corn/common.corn";

common();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Create ONE server
const server = http.createServer(app);

// ✅ Attach WebSocket to same server
initWebSocket(server);
app.use(cors({
  origin: ["http://localhost:5173", 'https://weather-station-1-jaaq.onrender.com'],
  credentials: true
}));

// Middleware for json
app.use(express.json());
// Middleware for route
app.use("/", userRoutes);
app.use("/", protectedRoutes);
app.use("/", protectedSensorRoutes);
app.use("/", sensorRoutes);

// Simple homepage route
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
    date: new Date().toISOString(),
  });
});

// ✅ Start ONLY this server
server.listen(PORT, async () => {
 await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});







//electronicsprojectslsw_db_user
//V6Uz9ofu1TLCx1tq
//mongodb+srv://electronicsprojectslsw_db_user:V6Uz9ofu1TLCx1tq@myprojects.4j0qrbd.mongodb.net/?appName=MyProjects
//WeatherStation
//SensorsData