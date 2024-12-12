import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

export const createCustomAwardSchema = z.object({
  title: stringValidation(1, 30, "title"),
  description: stringValidation(1, 60, "description").optional(),
  image: stringValidation(1, 300, "image"),
  criteria: stringValidation(1, 30, "criteria").optional(),
  assignedTo: objectIdValidation,
});

export const updateAwardSchema = z.object({
    
    title: stringValidation(1, 20, "title").optional(),
    description: stringValidation(1, 50, "description").optional(),
    image: stringValidation(1, 300, "image").optional(),
    criteria: stringValidation(1, 20, "criteria").optional(),
    assignedTo: objectIdValidation.optional(),
})
