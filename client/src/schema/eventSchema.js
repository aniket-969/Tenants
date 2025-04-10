import { z } from "zod";
import { stringValidation, objectIdValidation, optionalStringValidation } from "./../utils/validation";

export const createCalendarEventSchema = z
  .object({
    title: stringValidation(1, 10, "title"),
    description: optionalStringValidation(1, 50, "description"),
    recurrencePattern: z.enum(["weekly", "monthly", "yearly"]).optional(),
    isRecurring: z.boolean().optional(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      const { startDate, endDate } = data;

      if (!startDate || !endDate) return true;
      return endDate >= startDate;
    },
    {
      message: "End date must be greater than or equal to start date",
      path: ["endDate"],
    }
  );
