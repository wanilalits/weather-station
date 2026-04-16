

import {exportData} from  "../websocket/wsServer"
import { sendTelegramMessage } from "../modules/telegram/telegram.service";
export const formatData = (exportData: any[]) => {
 
  return exportData.map(d => `
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


export const TelegramMsg = async() => {
if (exportData.length > 0) {
  console.log("Done")
  //console.log(exportData)
 sendTelegramMessage(`📊 Latest Sensor Data:\n${formatData(exportData)}`);
 
} else {
   sendTelegramMessage(`no data to send`);
}
  exportData.length = 0; // ✅ clears the array               
};


