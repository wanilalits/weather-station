import { Request, Response } from "express";

// Get User → 
export const getProfile= async (req: any, res: Response) => {
//console.log(req.user);
  //console.log("Headers:", req.headers);
  console.log("Body:", req.body);
    try {         
res.json({ success: true, name:req.user.name});
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};