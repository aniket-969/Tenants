import {z} from "zod"

export const objectIdValidation = z
  .string()
  .refine((val) => isValidObjectId(val), {
    message: "Invalid objectId format",
  });

export const stringValidation = (min, max, fieldName) => {
 return z.string()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters long.`,
    })
    .max(max, {
      message: `${fieldName} must be no more than ${max} characters long.`,
    });
};
