import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

export const createCustomAwardSchema = z.object({
  roomId: objectIdValidation,
  title: stringValidation(1, 20, "title"),
  description: stringValidation(1, 50, "description").optional(),
  image: stringValidation(1, 300, "image"),
  criteria: stringValidation(1, 20, "criteria").optional(),
  assignedTo: objectIdValidation,
});
