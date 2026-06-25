import { Request, Response } from "express";
import protected_sensorsdatas  from '../sensor/sensor.model';
import { getLogsService } from "./protectedSensorRoutes.service";
// GET → fetch logs
export const getLogs = async (req: Request, res: Response) => {
console.log('.........................');

try {
   const { deviceid, startdate, enddate, limit,} = req.headers;
   if (!deviceid || !startdate || !enddate || !limit) {
      return res.status(400).json({success: false, message: "deviceid, startDateValue, enddateValue, limitValue headers are required",});
    }
const logs = await getLogsService({deviceid, limit, startdate, enddate});
 res.status(200).json({ success: true, count: logs.length, data: logs, }); } 
 
 catch (error) {
 return res.status(500).json({ success: false, message: "Failed to get logs", });
  }
};

//http://localhost:5000/device_log?deviceId=test_21&limit=100