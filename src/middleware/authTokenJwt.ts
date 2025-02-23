import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { ApiError } from "../error/apiError";
import redisClient from "../config/redis";

export const authToken: RequestHandler = async (req, res, next) => {
  try {
    let token = null;
    if (req.header("Authorization")) {
      token = req.header("Authorization")!.split(" ")[1];
    }
    if (await redisClient.get(`blacklist:${token}`)) {
      throw new ApiError("blacklist token", 401);
    }
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new ApiError("invalid token", 401);
        } else {
          req.body._id = decoded;
          req.body.token = token;
          next();
        }
      });
    } else {
      throw new ApiError("Token is not supplied", 401);
    }
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
