import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userID: String,
  password: String
});
export const User = mongoose.model("users", schema);
//(collection name, schem name)

/*  "userID":"user",
    "password":"user",
     */