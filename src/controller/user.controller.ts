import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../repositories/userRepository";
import { userSchema } from "../../prisma/schema/user.schema";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new Error(`${error}`);
    }
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, hashedPassword);
    if (user instanceof Error) {
      throw user;
    }

    res.status(201).json(user);
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
};
export const loginUser = async (req: Request, res: Response) => {};
export const logoutUser = async (req: Request, res: Response) => {};
