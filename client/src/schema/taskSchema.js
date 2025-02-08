import { stringValidation, objectIdValidation } from "@/utils/validation";
import { z } from "zod";

export const createRoomTaskSchema = z
  .object({
    title: stringValidation(1, 20, "title"),
    description: stringValidation(5, 50, "description").optional(),
    currentAssignee: objectIdValidation.optional(),
    assignmentMode: z.enum(["single", "rotation"]),
    dueDate: z
      .string()
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
      })
      .optional(),
    startDate: z
      .string()
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
      })
      .optional(),
    participants: z.array(objectIdValidation),
    rotationOrder: z.array(objectIdValidation).optional(),
    completed: z.boolean().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    recurring: z.boolean().optional(), // Indicates if it's a recurring task
    recurrencePattern: stringValidation(1, 20, "recurrence pattern").optional(),
    recurrenceDays: z.array(z.number()).optional(),
    customRecurrence: stringValidation(1, 20, "custom recurrence").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.recurring) {
      // If recurring is true, ensure required fields are provided
      if (!data.recurrenceDays || data.recurrenceDays.length === 0) {
        ctx.addIssue({
          path: ["recurrenceDays"],
          message: "At least one recurrence day should be selected",
        });
      }

      if (!data.recurrencePattern) {
        ctx.addIssue({
          path: ["recurrencePattern"],
          message: "Recurrence pattern is required for recurring tasks",
        });
      }

      if (!data.customRecurrence) {
        ctx.addIssue({
          path: ["customRecurrence"],
          message: "Custom recurrence details are required for recurring tasks",
        });
      }

      if (!data.rotationOrder || data.rotationOrder.length === 0) {
        ctx.addIssue({
          path: ["rotationOrder"],
          message: "Rotation order is required for recurring tasks",
        });
      }
    } else {
      // If recurring is false, ignore recurrence-related fields
      data.recurrenceDays = undefined;
      data.recurrencePattern = undefined;
      data.customRecurrence = undefined;
      data.rotationOrder = undefined;
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
  recurrencePattern: stringValidation(1, 20, "recurrence pattern").nullable(),
  customRecurrence: stringValidation(1, 20, "custom recurrence").nullable(),
  startDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    })
    .optional(),
});
