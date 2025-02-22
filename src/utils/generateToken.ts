import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const generateToken = (_id: string) => {
  return jwt.sign({ _id: _id }, JWT_SECRET, { expiresIn: "1d" });
};

export const getEXToken = (token: string) => {
  const decode = jwt.decode(token) as { exp?: number };
  const now = Math.floor(Date.now() / 1000); // Time now
  return decode.exp! - now; // expires time
};
