import { z } from "zod";
import { dateSchema, objectIdValidation, stringValidation } from "./customValidator.js";


export const createCalendarEventSchema = z.object({
  title: stringValidation(1, 10, "title"),
  description: stringValidation(1, 50, "description").optional(),
  recurrencePattern: stringValidation(1, 10, "recurrencePattern").optional(),
  isRecurring: z.boolean().optional(),
  startDate: dateSchema.refine((date) => date >= new Date(), {
    message: "Start date cannot be in the past",
  }),
  endDate: dateSchema.optional(),
}).refine(
  (data) => {
    if (data.endDate && data.endDate < data.startDate) {
      return false;
    }
    return true;
  },
  {
    message: "End date cannot be before start date",
    path: ["endDate"], // Ensure the error points to the correct field
  }
);
