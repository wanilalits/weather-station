
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
  • angle: ${d.angle}°
`).join("\n--------------------\n");
};


export const TelegramMsg = async() => {
if (exportData.length > 0) {
 sendTelegramMessage(`📊 Latest Sensor Data:\n${formatData(exportData)}`);
} else {
   sendTelegramMessage(`no data to send`);
}
  exportData.length = 0; // ✅ clears the array               
};


//[{"deviceId":"1","humidity":46.4,"tempAHT":32.7,"tempBMP":33.8,"pressure":981.5,"mx":407.0,"my":-478.0,"mz":-623.0,"angle":310.4}]
