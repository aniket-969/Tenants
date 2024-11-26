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

export const updatePaymentSchema = z.object({
    expenseId:objectIdValidation,
    paymentMode:stringValidation(1,20,"Payment mode").optional()
})

export const updateExpenseSchema = z.object({
    name: z.string().optional(),
    totalAmount: z.number().positive().optional(),
    paidBy: z.string().optional(),
    room: z.string().optional(),
    imageUrl: z.string().url().optional(),
    participants: z
      .array(
        z.object({
          user: z.string(),
          hasPaid: z.boolean().optional(),
          paidDate: z.date().optional(),
          amountOwed: z.number().positive(),
        })
      )
      .optional(),
    dueDate: z.date().optional(),
    paymentHistory: z
      .array(
        z.object({
          user: z.string(),
          amount: z.number().positive(),
          paymentDate: z.date(),
          description: z.string().optional(),
        })
      )
      .optional(),
  });