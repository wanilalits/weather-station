import { Request, Response } from "express";
import { User } from "./user.model";
import { createUser } from "./user.service";
import jwt from "jsonwebtoken";


// Get User → 
export const checkUser = async (req: Request, res: Response) => {
  //console.log("Headers:", req.headers);
  // console.log("Body:", req.body);
  try {

    if (!User.db?.db) {
      return res.status(500).json({ error: "Database not connected" });
    }
    res.json({ success: true, body: "body" });


  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};

// register User → 
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, city } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Save new user to database
    const user = await createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      name,
      email,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unknown error occurred",
    });
  }
};

// userLogin → 
export const userLogin = async (req: Request, res: Response) => {

  try {
    if (!User.db?.db) {
      return res.status(500).json({ error: "Database not connected" });
    }

    //find a user whose emailid  and password is matching 
    const user = await User.findOne({ email: req.body.email, password: req.body.password });

    if (!user) { return res.status(401).json({ error: "Invalid email or password" }); }
    //get a name from user
    console.log("User found:", user);
    const token = jwt.sign(
      { _id: user._id, name:user.name, email: user.email,  userType: "undefined" },
      process.env.JWT_SECRET || "my-secret-key_1",
      { expiresIn: "7d" }
    );
    res.json({ success: true, body: user.name, token });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
};