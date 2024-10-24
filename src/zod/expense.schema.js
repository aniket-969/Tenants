import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

const participantSchema = z.object({
  userId: objectIdValidation,
  amountOwed: z.number().positive("Amount owed must be a positive number"),
});

export const createExpenseSchema = z.object({
  name: stringValidation(1, 20, "name"),
  totalAmount: z
    .number()
    .positive("Amount owed must be a positive number")
    .max(7, { message: "Amount can't be above 7 digits" })
    .min(1),
  paidBy: objectIdValidation,
  room: objectIdValidation,
  imageUrl: stringValidation(5, 300, "imageUrl"),
  userExpense: z.array(participantSchema),
  dueDate: z.string().date().optional(),
});
