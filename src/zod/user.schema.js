import { z } from "zod";
import { objectIdValidation, stringValidation } from "./customValidator.js";

const passwordSchema = z
  .string()
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one numerical digit.",
  })
  .refine((value) => /[!@#$%^&*]/.test(value), {
    message: "Password must contain at least one special character.",
  });

export const registerSchema = z.object({
  username: stringValidation(1, 20, "username"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(50, { message: "Email must be no more than 50 characters long" }),
  fullName: stringValidation(1, 20, "fullName"),
  password: passwordSchema,
  avatar: stringValidation(5, 300, "avatar"),
  role: z.enum(["tenant", "landlord"]),
  room: objectIdValidation.optional(),
});

export const loginSchema = z.object({
  identifier: stringValidation(1, 20, "identifier"),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

export const updateUserSchema = z.object({
    username:stringValidation(1,20,"username").optional(),
    fullName:stringValidation(1,20,"fullName").optional(),
    avatar:stringValidation(1,20,"avatar").optional(),
})