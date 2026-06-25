interface APIRequest {
  deviceid: string;
  startdate: string;
  enddate: string;
  limit: string;
  authToken: string
}


interface SensorData {
  _id: string;
  deviceId: string;
  humidity?: number;
  tempAHT?: number;
  tempBMP?: number;
  time?: string;
  bucket?: number;
  __v?: number;
  // Allow any other dynamic properties
  [key: string]: string | number | boolean | null | undefined;
}



 //                                   (IN.......OUT)
export const deviceDataAPI = async (payload: APIRequest): Promise<SensorData[]> => {
  
  const API_ROOT = import.meta.env.VITE_API_ROOT;
  const response = await fetch(`${API_ROOT}/device_log/protected`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${payload.authToken}`,
    "deviceId": payload.deviceid,
    "startdate": payload.startdate,
    "enddate": payload.enddate,
    "limit": payload.limit
  }
  });

  if (!response.ok) {
    throw new Error("failed");
  }

  const data = await response.json();

  //again move to saga
  return data;
};