import mongoose from "mongoose";


interface IUser {
  name: string;
  email: string;
  password: string;
  city?: string; // optional
}
const schema = new mongoose.Schema<IUser>({
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true,   unique: true, },
  city: { type: String, required: false,  },
},
{timestamps: true,}
);
export const User = mongoose.model("users", schema);
//(collection name, schem name)

/*  "userID":"user",
    "password":"user",
*/