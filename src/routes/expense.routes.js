
import { Router } from 'express';
import { verifyJWT } from './../middleware/auth.middleware.js';
import { createExpense, deleteExpense, getExpenseDetails, getPendingPayments, getUserExpenses, updateExpense, updatePayment } from '../controllers/expense.controller.js';
import { checkMember } from '../middleware/poll.middleware.js';
import { validate } from './../middleware/validator.middleware.js';
import { createExpenseSchema, updatePaymentSchema } from '../zod/expense.schema.js';

const router = Router() 
router.route("/create-expense").post(verifyJWT,validate(createExpenseSchema),checkMember,createExpense)
router.route("/update-expense").patch(verifyJWT,validate(updatePaymentSchema),checkMember,updatePayment)
router.route("/user-expense").get(verifyJWT,getUserExpenses)
router.route("/pending").get(verifyJWT,getPendingPayments)
router.route("/:expenseId").get(verifyJWT,getExpenseDetails)
router.route("/:expenseId").patch(verifyJWT,updateExpense)
router.route("/:expenseId").delete(verifyJWT,deleteExpense)

export default router