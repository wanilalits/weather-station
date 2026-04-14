import cron from "node-cron";
import { sendTelegramMessage } from "../modules/telegram/telegram.service";
import {latestData} from  "../websocket/wsServer"
export const startTelegramCron = () => {
 cron.schedule("*/1 * * * *", async () => {
  //cron.schedule("*/1 * * * * *", async () => {
    //console.log(latestData); 
if (latestData.length > 0) {
 console.log(latestData)
  //await sendTelegramMessage(`Latest Sensor Data: ${JSON.stringify(latestData)}`);
} else {
  console.log("latestData")
}                  
  });
};


