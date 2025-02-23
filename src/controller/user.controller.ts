import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, getUser } from "../repositories/user.Repository";
import { ApiError } from "../error/apiError";
import { generateToken, getEXToken } from "../utils/generateToken";
import { bodyValidate } from "../utils/joiValidateBody";
import redisClient from "../config/redis";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = bodyValidate(req.body); //validate body
    if (result instanceof ApiError) {
      throw result;
    }
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword);
    if (user instanceof ApiError) {
      throw user; //return ApiError generate by function createUser
    }
    res.status(201).json(user);
  } catch (error: unknown) {
    next(error);
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = bodyValidate(req.body);
    if (result instanceof ApiError) {
      throw result;
    }
    const { email, password } = req.body;
    const user = await getUser({ email }); //get user required a object with email or id and return user if exits
    if (!user || !user.password) {
      throw new ApiError("user not found", 404); //in case the password not exist or user not exits
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user.id); //generate token jwt
      res.status(200).json({ token: token });
    } else {
      throw new ApiError("Invalid credentials", 400); //pasword not valid
    }
  } catch (error: unknown) {
    next(error);
  }
};
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  const exp = getEXToken(token);
  if (exp) await redisClient.set(`blacklist:${token}`, token, { EX: exp }); //add token at blacklist
  res.sendStatus(200);
  try {
  } catch (error: unknown) {
    next(error);
  }
};
