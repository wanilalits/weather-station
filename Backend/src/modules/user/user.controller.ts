import { Request, Response } from "express";
import {User} from "./user.model";


// Get User → 
export const checkUser= async (req: Request, res: Response) => {
 //console.log("Headers:", req.headers);
 // console.log("Body:", req.body);
    try {         

  if (!User.db?.db) {
  return res.status(500).json({ error: "Database not connected" });
}


res.json({ success: true, body:"body"});


  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};




//http://localhost:5000/