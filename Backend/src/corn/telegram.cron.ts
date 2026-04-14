import cron from "node-cron";
import { sendTelegramMessage } from "../modules/telegram/telegram.service";
import {exportData} from  "../websocket/wsServer"
export const startTelegramCron = () => {
 cron.schedule("*/5 * * * *", async () => {
  //cron.schedule("*/1 * * * * *", async () => {
    //console.log(latestData); 
if (exportData.length > 0) {
 console.log(exportData)
  await sendTelegramMessage(`Latest Sensor Data: ${JSON.stringify(exportData)}`);
} else {
  console.log("latestData")
}                  
  });
};


