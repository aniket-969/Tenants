import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

const additionalChargeSchema = z.object({
  amount: z.coerce
    .number()
    .positive("Additional charge must be a positive number")
    .max(1000000, "Amount can't exceed 6 digits"),
  reason: z.string().min(1, "Reason is required").max(200, "Reason too long"),
});

const participantSchema = z.object({
  userId: objectIdValidation,
  hasPaid: z.boolean().default(false),
  baseAmount: z.coerce
    .number()
    .positive("Base amount must be a positive number")
    .max(1000000, "Amount can't exceed 6 digits"),
  additionalCharges: z.array(additionalChargeSchema).optional(),
});

export const createExpenseSchema = z.object({
  title: stringValidation(1, 50, "title"),
  imageUrl: stringValidation(5, 300, "imageUrl").optional(),
  participants: z.array(participantSchema),
  dueDate: z.coerce.date().optional(),
});

export const updatePaymentSchema = z.object({
  paymentMode: stringValidation(1, 20, "Payment mode").optional(),
});

export const updateExpenseSchema = z.object({
  name: z.string().optional(),
  totalAmount: z.number().positive().optional(),
  paidBy: z.string().optional(),
  imageUrl: z.string().url().optional(),
  participants: z
    .array(
      z.object({
        user: z.string(),
        hasPaid: z.boolean().optional(),
        paidDate: z
          .string()
          .transform((val) => new Date(val))
          .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date format",
          })
          .optional(),
        amountOwed: z.number().positive(),
      })
    )
    .optional(),
  dueDate: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date format",
    })
    .optional(),
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
