
import { Router } from 'express';
import { verifyJWT } from './../middleware/auth.middleware.js';
import { createExpense, updatePayment } from '../controllers/expense.controller.js';

const router = Router()
router.route("/create-expense").post(verifyJWT,createExpense)
router.route("/update-expense").patch(verifyJWT,updatePayment)

export default router