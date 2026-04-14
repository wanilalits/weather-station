import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
dotenv.config();
import sensorRoutes from "./modules/sensor/sensor.routes";
import { initWebSocket } from "./websocket/wsServer";
import http from "http";

import { startTelegramCron } from "./corn/telegram.cron";

startTelegramCron();






const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Create ONE server
const server = http.createServer(app);

// ✅ Attach WebSocket to SAME server
initWebSocket(server);

// Middleware
app.use(express.json());
app.use("/", sensorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "API working",
    date: new Date(),
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