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
  const { expenseId, paymentMode } = req.body;
  const expense = await Expense.findById(expenseId);

  if (!expense) {
    throw new ApiError(404, "Expense doesn't exist");
  }

  const participant = expense.participants.find(
    (part) => part.user.toString() === userId.toString()
  );

  if (!participant) {
    throw new ApiError(403, "You are not part of participant in this expense");
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

const getUserExpenses = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const expenses = await Expense.find({ "participants.user": userId })
    .populate("paidBy", "fullName avatar")
    .populate("participants.user", "fullName avatar");

  if (!expenses.length) {
    return res.json(new ApiResponse(200, [], "No expenses found for the user"));
  }

  return res.json(
    new ApiResponse(200, expense, "user expenses fetched successfully")
  );
});

const getPendingPayments = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const pendingExpense = await Expense.find({ paidBy: userId })
    .populate("paidBy", "fullName avatar")
    .populate("participants.user", "fullName avatar");

  if (!pendingExpense.length) {
    return res.json(new ApiResponse(200, [], "No user payment found"));
  }

  return res.json(
    new ApiResponse(
      200,
      pendingExpense,
      " Pending payments owed to user fetched successfully"
    )
  );
});

const deleteExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;

  const deletedExpense = await Expense.findByIdAndDelete(expenseId);
  if (!deletedExpense) {
    throw new ApiError(404, "Expense not find");
  }

  return res.json(new ApiResponse(200, {}, "Expense deleted successfully"));
});

const getExpenseDetails = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const expense = await Expense.findById(expenseId)
    .populate("paidBy", "fullName avatar")
    .populate("participants.user", "fullName avatar");

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  return res.json(
    new ApiResponse(200, expense, "Expense details fetched successfully")
  );
});

const updateExpense = asyncHandler(async (req, res) => {
  const { expenseId } = req.params;
  const updates = req.body;

  const expense = await Expense.findByIdAndUpdate(expenseId, updates, {
    new: true,
  });

  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  return res.json(
    new ApiResponse(200, expense, "Expense updated successfully")
  );
});

export {
  createExpense,
  updatePayment,
  getUserExpenses,
  getPendingPayments,
  deleteExpense,
  getExpenseDetails,
  updateExpense,
};
