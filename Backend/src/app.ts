import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import sensorRoutes from "./modules/sensor/sensor.routes";
import { initWebSocket } from "./websocket/wsServer";
import http from "http";
dotenv.config();

const app = express();
const PORT = 5000;


// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket
initWebSocket(server);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});








app.get("/", (req, res) => {
  res.json({
    message: "API working",
    date: new Date(),
  });
});
app.use(express.json());
app.use("/", sensorRoutes);
async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(` ..Server running on http://localhost:${PORT}`);
  });
}

start();

//electronicsprojectslsw_db_user
//V6Uz9ofu1TLCx1tq
//mongodb+srv://electronicsprojectslsw_db_user:V6Uz9ofu1TLCx1tq@myprojects.4j0qrbd.mongodb.net/?appName=MyProjects
//WeatherStation
//SensorsData