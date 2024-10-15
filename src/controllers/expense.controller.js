import { Expense } from "../models/expense.model";
import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError"

const createExpense = asyncHandler(async (req, res) => {
  const { name, totalAmount, paidBy, room, imageUrl, userExpense, dueDate } =
    req.body;

  const participants = userExpense.map((user) => ({
    user: userId,
    amountOwned: user.amountOwed,
  }));

  const expense = await Expense.create({
    name,
    totalAmount,
    paidBy,
    room,
    imageUrl,
    dueDate,
    participants
  });
  if (!expense) {
    throw new ApiError(500, "Expense creation failed");
  }
  return res.json(new ApiResponse(201,expense,"Expense detail created successfully"))
});

export {createExpense}