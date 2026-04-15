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
   local
`).join("\n--------------------\n");
};


export const startTelegramCron = () => {
 cron.schedule("*/13 * * * *", async () => {
  //cron.schedule("*/20 * * * * *", async () => {
   
if (exportData.length > 0) {
 console.log(exportData)
await sendTelegramMessage(`📊 Latest Sensor Data:\n${formatData(exportData)}`);
 console.log(exportData)
} else {
  await sendTelegramMessage(`no data to send from local`);
}
  exportData.length = 0; // ✅ clears the array                  
  });
};


