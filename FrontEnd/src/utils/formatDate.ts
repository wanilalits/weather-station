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


export const getUTCStartDate = (range: string): string => {
  const now = new Date();
  const start = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),0, 0, 0, 0 ));
  
  switch (range) {
    case "24Hr":
      start.setUTCDate(start.getUTCDate() - 1);
      break;

    case "7D":
      start.setUTCDate(start.getUTCDate() - 7);
      break;

    case "1M":
      start.setUTCMonth(start.getUTCMonth() - 1);
      break;

    case "1Y":
      start.setUTCFullYear(start.getUTCFullYear() - 1);
      break;
 case "max":
      start.setUTCFullYear(start.getUTCFullYear() - 5);
      break;

       case "custom":
      start.setUTCFullYear(start.getUTCFullYear() - 1);
      break;
      
  }

  return start.toISOString();

};

export const getUTCtoLocalSyatemDate = (date: string| any): string => {
  const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const localTime = new Date(date).toLocaleString(
  "en-IN",
  {
    timeZone: systemTimeZone,
  }
);
  return localTime

};