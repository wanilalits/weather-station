export interface SensorData {
  _id: string;
  deviceId: string;
  humidity?: number;
  tempAHT?: number;
  tempBMP?: number;
  time?: string;
  bucket?: number;
  __v?: number;

  [key: string]: string | number | boolean | null | undefined;
}


export interface APIRequest {
  deviceid: string;
  startdate: string;
  enddate: string;
  limit: number;
  authToken: string
}