import { ErrorRequestHandler, RequestHandler } from "express";
import { ApiError } from "../error/apiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
  } else if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
  next();
};
