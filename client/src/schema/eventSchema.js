import { z } from "zod";
import { stringValidation,objectIdValidation } from "./../utils/validation";

export const createCalendarEventSchema = z.object({
    title: stringValidation(1, 10, "title"),
    description: stringValidation(1, 30, "description").optional(),
    recurrencePattern: stringValidation(1, 10, "recurrencePattern").optional(),
    isRecurring: z.boolean().optional(),
    startDate: z
    .string()
    .transform((val) => new Date(val)) 
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }).optional(),
    endDate:z
    .string()
    .transform((val) => new Date(val)) 
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    }).optional()
  });