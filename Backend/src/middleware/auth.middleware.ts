import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request,res: Response,next: NextFunction) => 
  { 
    const authHeader = req.headers.authorization;
     // console.log (authHeader);
  if (!authHeader) 
    {
    return res.status(401).json({error: "Token missing",});
    }
    const token = authHeader.split(" ")[1];
  try 
  {
    const decoded = jwt.verify( token, process.env.JWT_SECRET || "my-secret-key_1",);
    (req as any).user  = decoded;
    next();
  } 
  catch 
  {return res.status(401).json({error: "Invalid token",});}
};