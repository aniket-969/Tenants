import { Expense } from "../models/expense.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createExpense = asyncHandler(async (req, res) => {
  const { name, totalAmount, paidBy, room, imageUrl, userExpense, dueDate } =
    req.body;

  const participants = userExpense.map((user) => ({
    user: user.userId,
    amountOwed: user.amountOwed,
  }));

  const expense = await Expense.create({
    name,
    totalAmount,
    paidBy,
    room,
    imageUrl,
    dueDate,
    participants,
  });
  if (!expense) {
    throw new ApiError(500, "Expense creation failed");
  }
  return res.json(
    new ApiResponse(201, expense, "Expense detail created successfully")
  );
});

const updatePayment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { expenseId,paymentMode } = req.body;
  const expense = await Expense.findById(expenseId);

  if (!expense) {
    throw new ApiError(404, "Expense doesn't exist");
  }

  const participant = expense.participants.find(
    (part) => part.user.toString() === userId.toString()
  );

  if (!participant) {
    throw new ApiError(403, "Your are not part of participant in this expense");
  }

  if (participant.hasPaid) {
    throw new ApiError(400, "You have already paid for this expense");
  }

  participant.hasPaid = true;
  participant.paidDate = new Date();

  expense.paymentHistory.push({
    user: userId,
    amount: participant.amountOwed, 
    paymentDate: new Date(),
    description: paymentMode,
  });

  await expense.save();

  return res.json(
    new ApiResponse(200, expense, "Payment updated successfully")
  );
});

export { createExpense, updatePayment };
