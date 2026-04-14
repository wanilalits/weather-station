import axios from "axios";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const CHAT_ID = process.env.CHAT_ID!;
export const sendTelegramMessage = async (text: string) => {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });
  } catch (error: any) {
    console.error("Telegram error:", error.message);
    console.log (`Chat ID: ${CHAT_ID}, Bot Token: ${BOT_TOKEN}` );
  }
};

//https://api.telegram.org/bot8783532358:AAF8SmURZK2XCsNAJOjCziaH4p3vRcUxw80/sendMessage