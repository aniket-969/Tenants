import { z } from "zod";
import { stringValidation } from "./../utils/validation";

export const pollSchema = z.object({
  title: stringValidation(1, 100, "title"),
  status: z.enum(["active", "completed", "closed"]).optional(),
  voteEndTime: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  options: z
    .array(stringValidation(1, 100, "Option Text"))
    .min(1, { message: "At least one option is required" }),
});
