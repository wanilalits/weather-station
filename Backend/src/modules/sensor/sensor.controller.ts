import { Request, Response } from "express";
import Sensor from "./sensor.model";

// POST → save data
export const createLog= async (req: Request, res: Response) => {
 console.log("Headers:", req.headers);
  console.log("Body:", req.body);
    try {
    const { deviceId, humidity } = req.body;

    if (!deviceId || humidity === undefined) {
      return res.status(400).json({ error: "deviceId and humidity required", });
    }
    const data = await Sensor.create({ deviceId, humidity });
    const total = await Sensor.countDocuments();


  if (!Sensor.db?.db) {
  return res.status(500).json({ error: "Database not connected" });
}

const stats = await Sensor.db.db.command({collStats: Sensor.collection.name,});

const allstats = await Sensor.db.db!.stats();


res.json({ success: true,
   totalEntries: total,
 totalDocs: stats.count,
  avgDocSize: stats.avgObjSize,
  sizeKB: (stats.size / 1024).toFixed(2),
  storageMB: (stats.storageSize / (1024 * 1024)).toFixed(2),
   dbSizeMB: (allstats.dataSize / (1024 * 1024)).toFixed(4),
     });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};

// GET → fetch logs
export const getLogs = async (req: Request, res: Response) => {
  try {
    const { deviceId, limit } = req.query;

    const logs = await Sensor.find({ deviceId })
      .sort({ time: -1 })
      .limit(Number(limit) || 10);

    res.json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};




//http://localhost:5000/device_log?deviceId=test_21&limit=100