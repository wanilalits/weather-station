import cron from "node-cron";
import { sendTelegramMessage } from "../modules/telegram/telegram.service";
import {latestData} from  "../websocket/wsServer"
export const startTelegramCron = () => {
 cron.schedule("*/10 * * * *", async () => {
  //cron.schedule("*/5 * * * * *", async () => {
    console.log(latestData); 
    await sendTelegramMessage(latestData.length > 0 ? `Latest Sensor Data: ${JSON.stringify(latestData)}` : "No new sensor data available.");
                        
  });
};


