import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    splitAmount: {
      type: Number,
      required: true,  // Per participant split amount
    },
    imageUrl: {
      type: String, // Link to uploaded bill image
      default: null,
    },
    participants: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },  // Participant's ID
        hasPaid: { type: Boolean, default: false },           // Has participant paid?
        paidDate: { type: Date, default: null },              // When did they pay?
        amountOwed: { type: Number, required: true },         // Amount owed by the participant
      },
    ],
    dueDate: {
      type: Date,
      required: true,
    },
    paymentHistory: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },  // User who made a payment
        amount: { type: Number, required: true },            // Amount paid
        paymentDate: { type: Date, required: true },         // Date of payment
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
