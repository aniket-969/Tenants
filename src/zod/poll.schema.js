import { objectIdValidation, stringValidation } from "./customValidator.js";
import { z } from "zod";

export const pollSchema = z.object({
  title: stringValidation(1, 30, "title"),
  createdBy: objectIdValidation,
  roomId: objectIdValidation,
  status: z.enum[("active", "completed", "closed")],
  voteEndTime: stringValidation(1, 10, "voteEndTime"),
  options: z
    .array(
      z.object({
        optionText: stringValidation(1, 100, "Option Text"),
        votes: z
          .array(
            z.object({
              voter: objectIdValidation,
            })
          )
          .optional(),
      })
    )
    .min(1, { message: "At least one option is required" }),
});
