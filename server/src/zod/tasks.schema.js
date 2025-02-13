import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

export const createRoomTaskSchema = z
  .object({
    title: stringValidation(1, 20, "title"),
    description: stringValidation(5, 50, "description").optional(),
    assignmentMode: z.enum(["single", "rotation"]),
    dueDate: z.date().optional(),
    startDate: z.date().optional(),
    participants: z.array(objectIdValidation),
    rotationOrder: z.array(objectIdValidation).optional(),
    completed: z.boolean().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    recurring: z.boolean().optional(),
    recurrencePattern: stringValidation(1, 20, "recurrence pattern").optional(),
    recurrenceDays: z.array(z.string()).optional(),
    customRecurrence: stringValidation(1, 20, "custom recurrence").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.recurring) {
      const hasRecurrenceDays =
        data.recurrenceDays && data.recurrenceDays.length > 0;
      const hasRecurrencePattern = !!data.recurrencePattern;
      const hasCustomRecurrence = !!data.customRecurrence;

      if (!hasRecurrenceDays && !hasRecurrencePattern && !hasCustomRecurrence) {
        ctx.addIssue({
          path: ["recurrenceDays"],
          message:
            "At least one of recurrenceDays, recurrencePattern, or customRecurrence must be provided",
        });
      }
    }
  });

export const updateRoomTaskSchema = z.object({
  roomId: objectIdValidation,
  taskId: objectIdValidation,
  title: stringValidation(1, 20, "title").optional(),
  description: stringValidation(5, 50, "description").optional(),
  currentAssignee: objectIdValidation.optional(),
  dueDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    })
    .optional(),
  participants: z.array(objectIdValidation).optional(),
  rotationOrder: stringValidation(1, 20, "rotationOrder").optional(),
  completed: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  recurring: z.boolean().optional(),
  recurrencePattern: stringValidation(1, 20, "recurrence pattern").optional(),
  customRecurrence: stringValidation(1, 20, "custom recurrence").optional(),
});
