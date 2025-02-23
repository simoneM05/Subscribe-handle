import { RequestHandler } from "express";
import { bodyValidateSub } from "../utils/joiValidateBody";
import { ApiError } from "../error/apiError";
import { createSub } from "../repositories/subscription.Repository";

export const addSub: RequestHandler = async (req, res, next) => {
  try {
    const result = bodyValidateSub(req.body); //validate body
    if (result instanceof ApiError) {
      throw result;
    }
    const { name, price, renewal, type, _id } = req.body;
    const sub = await createSub(name, price, renewal, type, _id);
    if (sub instanceof ApiError) {
      throw sub; //return ApiError generate by function createUser
    }
    res.status(201).json({ sub: sub });
  } catch (error) {
    next(error);
  }
};

export const getSubs: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
}; //TODO

export const getSub: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
}; //TODO

export const deleteSub: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
}; //TODO

export const editSub: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
}; //TODO

export const statsSub: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
}; //TODO
