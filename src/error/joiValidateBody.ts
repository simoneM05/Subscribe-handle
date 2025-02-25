import { SubSchema, SubSchemaEdit } from "../../prisma/schema/sub.schema";
import { userSchema } from "../../prisma/schema/user.schema";
import { ApiError } from "../error/apiError";

export type BodyUser = {
  email: string;
  password: string;
};
export type BodySub = {
  email: string;
  password: string;
  name: string;
  price: number;
  type: string;
  active: boolean;
  renewal: Date;
};

export const bodyValidateSub = (body: BodySub) => {
  const { error } = SubSchema.validate(body);
  if (error) {
    return new ApiError(`${error}`, 400);
  }
  return null;
};
export const bodyValidateUser = (body: BodyUser) => {
  const { error } = userSchema.validate(body);
  if (error) {
    return new ApiError(`${error}`, 400);
  }
  return null;
};

export const bodyValidateSubEdit = (body: BodySub) => {
  const { error } = SubSchemaEdit.validate(body);
  if (error) {
    return new ApiError(`${error}`, 400);
  }
  return null;
};
