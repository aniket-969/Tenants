import { Expense } from "../models/expense.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ExpenseEventEnum } from "../constants.js";
import { emitSocketEvent } from "../socket/index.js";
const createExpense = asyncHandler(async (req, res) => {
  const {roomId} = req.params
  const { name, totalAmount,  imageUrl, userExpense, dueDate } =
    req.body;
const paidBy = req.user._id
  const participants = userExpense.map((user) => ({
    user: user.userId,
    amountOwed: user.amountOwed,
  }));

  const expense = await Expense.create({
    name,
    totalAmount,
    paidBy,
    roomId,
    imageUrl,
    dueDate,
    participants,
  });
  if (!expense) {
    throw new ApiError(500, "Expense creation failed");
  }
  const user = req.user
  emitSocketEvent(
    req,
    roomId,
    ExpenseEventEnum.EXPENSE_CREATED_EVENT,
    `${user.fullName} made new expense`
  );
  return res.json(
    new ApiResponse(201, expense, "Expense detail created successfully")
  );
});
 
const updatePayment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {expenseId,roomId} = req.params
  const { paymentMode } = req.body;
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
  const user = req.user
  emitSocketEvent(
    req,
    roomId,
    ExpenseEventEnum.EXPENSE_UPDATED_EVENT,
    `${user.fullName} updated the expense`
  );
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
  const { expenseId,roomId } = req.params;

  const deletedExpense = await Expense.findByIdAndDelete(expenseId);
  if (!deletedExpense) {
    throw new ApiError(404, "Expense not find");
  }
  const user = req.user
  emitSocketEvent(
    req,
    roomId,
    ExpenseEventEnum.EXPENSE_DELETED_EVENT,
    `${user.fullName} deleted the expense`
  );
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
  const { expenseId,roomId } = req.params;
  const userId = req.user.id; // Assuming authenticated user ID is available in req.user
  const { name, totalAmount, paidBy, imageUrl, participants, dueDate, paymentHistory } = req.body;

  // Fetch the expense to validate ownership
  const expense = await Expense.findById(expenseId);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  // Validate if the user is allowed to update the expense
  if (expense.paidBy.toString() !== userId) {
    throw new ApiError(403, "You are not authorized to update this expense");
  }

  // Prepare updates based on provided fields
  const updates = {
    ...(name !== undefined && { name }),
    ...(totalAmount !== undefined && { totalAmount }),
    ...(paidBy !== undefined && { paidBy }),
    ...(imageUrl !== undefined && { imageUrl }),
    ...(participants !== undefined && { participants }),
    ...(dueDate !== undefined && { dueDate }),
    ...(paymentHistory !== undefined && { paymentHistory }),
  };

  // Update the expense document
  const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updates, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation rules are enforced
  });
  const user = req.user
  emitSocketEvent(
    req,
    roomId,
    MaintenanceEventEnum.MAINTENANCE_DELETED_EVENT,
    `${user.fullName} deleted maintenance issue`
  );

  return res.json(
    new ApiResponse(200, updatedExpense, "Expense updated successfully")
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
