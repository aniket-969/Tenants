import { objectIdValidation, stringValidation } from "./customValidator.js";
import { z } from "zod";

export const pollSchema = z.object({
  title: stringValidation(1, 100, "title"),
  status: z.enum(["active", "completed", "closed"]),
  voteEndTime: stringValidation(1, 100, "voteEndTime"),
  options: z
  .array(stringValidation(1, 100, "Option Text"))
  .min(1, { message: "At least one option is required" }),
});

export const castVoteSchema = z.object({
  pollId: objectIdValidation,
  optionId: objectIdValidation,
});
