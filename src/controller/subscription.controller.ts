import { RequestHandler } from "express";
import { bodyValidateSub } from "../utils/joiValidateBody";
import { ApiError } from "../error/apiError";

export const addSub: RequestHandler = async (req, res, next) => {
  try {
    const result = bodyValidateSub(req.body); //validate body
    if (result instanceof ApiError) {
      throw result;
    }
  } catch (error) {
    next(error);
  }
}; //TODO

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
