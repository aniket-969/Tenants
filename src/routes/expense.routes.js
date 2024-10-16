
import { Router } from 'express';
import { verifyJWT } from './../middleware/auth.middleware.js';
import { createExpense, getPendingPayments, getUserExpenses, updatePayment } from '../controllers/expense.controller.js';

const router = Router()
router.route("/create-expense").post(verifyJWT,createExpense)
router.route("/update-expense").patch(verifyJWT,updatePayment)
router.route("/expense").get(verifyJWT,getUserExpenses)
router.route("/pendingExpense").get(verifyJWT,getPendingPayments)

export default router