import {z} from "zod"

export const stringValidation = (min, max, fieldName) => {
    return z.string()
       .min(min, {
         message: `${fieldName} must be at least ${min} characters long.`,
       })
       .max(max, {
         message: `${fieldName} must be no more than ${max} characters long.`,
       });
   };