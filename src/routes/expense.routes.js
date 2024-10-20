
import { Router } from 'express';
import { verifyJWT } from './../middleware/auth.middleware.js';
import { createExpense, deleteExpense, getExpenseDetails, getPendingPayments, getUserExpenses, updateExpense, updatePayment } from '../controllers/expense.controller.js';

const router = Router()
router.route("/create-expense").post(verifyJWT,createExpense)
router.route("/update-expense").patch(verifyJWT,updatePayment)
router.route("/user-expense").get(verifyJWT,getUserExpenses)
router.route("/pending").get(verifyJWT,getPendingPayments)
router.route("/:expenseId").get(verifyJWT,getExpenseDetails)
router.route("/:expenseId").patch(verifyJWT,updateExpense)
router.route("/:expenseId").delete(verifyJWT,deleteExpense)

export default router