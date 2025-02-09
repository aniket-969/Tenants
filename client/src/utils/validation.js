import { z } from "zod";

export const stringValidation = (min, max, fieldName) => {
  return z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val)) // Convert empty string to undefined
    .optional() // Make field optional
    .refine((val) => val === undefined || val.length >= min, {
      message: `${fieldName} must be at least ${min} characters long.`,
    })
    .refine((val) => val === undefined || val.length <= max, {
      message: `${fieldName} must be no more than ${max} characters long.`,
    });
};

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdValidation = z
  .string()
  .refine((val) => objectIdRegex.test(val), {
    message: "Invalid ObjectId format",
  });
