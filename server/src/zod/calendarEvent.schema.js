import {z} from "zod"
import { objectIdValidation, stringValidation } from "./customValidator.js"

export const createCalendarEventSchema = z.object({
  title: stringValidation(1, 10, "title"),
  description: stringValidation(1, 30, "description").optional(),
  createdBy: objectIdValidation,
  recurrencePattern: stringValidation(1, 10, "recurrencePattern").optional(),
  roomId: objectIdValidation,
  isRecurring: z.boolean().optional(),
  startDate: z.date().refine(date => date >= new Date(), {
    message: "Start date cannot be in the past",
  }),
  endDate: z.date().optional().refine((endDate, ctx) => {
    if (endDate && ctx.parent.startDate && endDate < ctx.parent.startDate) {
      return false;
    }
    return true;
  }, {
    message: "End date cannot be before start date",
  }),
});
 