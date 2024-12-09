import { Router } from "express";
import { verifyJWT } from "./../middleware/auth.middleware.js";
import {
  createExpense,
  deleteExpense,
  getExpenseDetails,
  getPendingPayments,
  getUserExpenses,
  updateExpense,
  updatePayment,
} from "../controllers/expense.controller.js";
import { checkMember } from "../middleware/room.middleware.js";
import { validate } from "./../middleware/validator.middleware.js";
import {
  createExpenseSchema,
  updateExpenseSchema,
  updatePaymentSchema,
} from "../zod/expense.schema.js";

const router = Router();
router
  .route("/")
  .post(verifyJWT, validate(createExpenseSchema), checkMember, createExpense);
router
  .route("/")
  .patch(verifyJWT, validate(updatePaymentSchema), checkMember, updatePayment);
router.route("/user").get(verifyJWT, getUserExpenses);
router.route("/pending").get(verifyJWT, getPendingPayments);
router.route("/:expenseId").get(verifyJWT, getExpenseDetails);
router
  .route("/:expenseId")
  .patch(verifyJWT, validate(updateExpenseSchema), checkMember, updateExpense);
router.route("/:expenseId").delete(verifyJWT, deleteExpense);

export default router;
