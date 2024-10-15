
import { Router } from 'express';
import { verifyJWT } from './../middleware/auth.middleware.js';
import { createExpense } from '../controllers/expense.controller.js';

const router = Router()
router.route("/create-expense").post(verifyJWT,createExpense)

export default router