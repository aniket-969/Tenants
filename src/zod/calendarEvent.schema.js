import {z} from "zod"
import { objectIdValidation, stringValidation } from "./customValidator"

export const createCalendarEvent = z.object({
  title:stringValidation(1,10,"title"),
  description:stringValidation(1,30,"description").optional(),
  recurrencePattern:stringValidation(1,10,"recurrencePattern").optional(),
  roomId:objectIdValidation,
  isRecurring:z.boolean().optional(),
  startDate:z.date(),
  endDate:z.date().optional()

}) 