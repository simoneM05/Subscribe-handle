import { userSchema } from "../../prisma/schema/user.schema";
import { ApiError } from "../error/apiError";

export type Body = {
  email: string;
  password: string;
};

export const bodyValidate = (body: Body) => {
  const { error } = userSchema.validate(body);
  if (error) {
    return new ApiError(`${error}`, 400);
  }
  return null;
};
