import { Request, Response } from "express";

// Get User → 
export const getProfile= async (req: Request, res: Response) => {
  console.log("Headers:");
 //console.log("Headers:", req.headers);
 // console.log("Body:", req.body);
    try {         
res.json({ success: true, body:"body"});
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};