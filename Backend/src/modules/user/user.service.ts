import { User } from "./user.model";

export const createUser = async (data: { name: string; email: string;password: string; city?: string;}) => {
 console.log("sucess")
  const user = new User(data);
  return await user.save();
};