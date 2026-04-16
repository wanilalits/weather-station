import cron from "node-cron";
import { TelegramMsg} from "./telegram";
import {saveData} from "./savedata";
export const common= () => {
 cron.schedule("*/15 * * * * *", async () => {

      console.log("Cron triggered at:", new Date().toLocaleString());
     await TelegramMsg(); //task 1
      await saveData()// task 2
      // task 3
    },
    {
      timezone: "Asia/Kolkata" // ✅ correct place
    }
  );
};


