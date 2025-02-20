import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (_id: string) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
