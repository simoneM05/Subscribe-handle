import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const authToken: RequestHandler = async (req, res, next) => {
  let token = null;
  if (req.header("Authorization")) {
    token = req.header("Authorization")!.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ msg: "Invalid Token" });
      } else {
        req.body._id = decoded;
        req.body.token = token;
        next();
      }
    });
  } else {
    res.status(401).send({ msg: "Token is not supplied" });
  }
};
