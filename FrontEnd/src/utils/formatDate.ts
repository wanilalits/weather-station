export const formatISTDate = (timestamp: string): string => {
   //ts = "2026-04-30T08:58:44.674Z";
  if (!timestamp) return "";

  const d = new Date(timestamp);

  let str = d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  return str.replace(",", "").replace(" am", "AM").replace(" pm", "PM");
};