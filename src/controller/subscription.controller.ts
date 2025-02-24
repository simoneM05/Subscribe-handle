import { RequestHandler } from "express";
import { bodyValidateSub } from "../error/joiValidateBody";
import { ApiError } from "../error/apiError";
import {
  createSub,
  deleteSubOne,
  getSubOne,
  getSubsPagination,
  updateSub,
} from "../repositories/subscription.Repository";
import { SubI } from "../interface/SubI";

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
    const page = req.query.page as string; //page request
    if (!page) throw new ApiError("page not supplied", 400);
    const userId = req.body._id; // userid
    const pageSize = 10; //number of sub
    const skip: number = (Number(page) - 1) * pageSize; //use for skip sub in precedent page
    const subs = await getSubsPagination(skip, pageSize, userId);
    if (!subs) throw new ApiError("subs not found", 404);
    res.status(200).json({ subs: subs });
  } catch (error) {
    next(error);
  }
};

export const getSub: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.body._id; //userId
    const id = req.params.id; //sub id
    const sub = await getSubOne(userId, { id });
    if (!sub) throw new ApiError("subs not found", 404);
    res.status(200).json({ sub: sub });
  } catch (error) {
    next(error);
  }
};

export const deleteSub: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const subDelete = await deleteSubOne(id, userId);
    if (subDelete) res.status(200).json("sub deleted");
  } catch (error) {
    next(error);
  }
};

export const editSub: RequestHandler = async (req, res, next) => {
  try {
    const result = bodyValidateSub(req.body); //validate body
    if (result instanceof ApiError) {
      throw result;
    }
    const { id } = req.params;
    const { name, price, renewal, type, _id: userId } = req.body;
    const update: SubI = {};
    if (name) update.name = name;
    if (price) update.price = price;
    if (renewal) update.renewal = renewal;
    if (type) update.type = type;

    const editSub = await updateSub(id, userId, update);
    if (editSub instanceof ApiError) {
      throw editSub;
    }
    res.status(201).json(editSub);
  } catch (error) {
    next(error);
  }
};

export const statusSub: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const statusSub = await getSubOne(id, userId);
    if (statusSub instanceof ApiError) res.status(200).json("sub deleted");
    res.status(200).json({ status: statusSub?.renewal });
  } catch (error) {
    next(error);
  }
};
