import cron from "node-cron";
import { sendTelegramMessage } from "../modules/telegram/telegram.service";
import {exportData} from  "../websocket/wsServer"

const formatData = (data: any[]) => {
  return data.map(d => `
📡 Device ID: ${d.deviceId}

🌡 Temp (AHT): ${d.tempAHT}°C
🌡 Temp (BMP): ${d.tempBMP}°C
💧 Humidity: ${d.humidity}%
📉 Pressure: ${d.pressure} hPa

🧭 Magnetometer:
   • X: ${d.mx}
   • Y: ${d.my}
   • Z: ${d.mz}
`).join("\n--------------------\n");
};




export const startTelegramCron = () => {
 cron.schedule("*/15 * * * *", async () => {
  //cron.schedule("*/2 * * * * *", async () => {
   
if (exportData.length > 0) {
 console.log(exportData)
await sendTelegramMessage(`📊 Latest Sensor Data:\n${formatData(exportData)}`);
 console.log(exportData)
} else {
  //console.log("exportData")
}
  exportData.length = 0; // ✅ clears the array                  
  });
};


