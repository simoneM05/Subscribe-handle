import Joi from "joi";

export const SubSchema = Joi.object({
  _id: Joi.required(),
  token: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number(),
  renewal: Joi.date().required(),
  type: Joi.alternatives()
    .try(
      Joi.string().valid("monthly", "yearly", "weekly"),
      Joi.string().pattern(/^\d+\s(years?|months?|weeks?)$/) // e.g., "2 years", "3 months"
    )
    .required(),
});
