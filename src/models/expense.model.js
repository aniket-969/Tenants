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
    imageUrl: {
      type: String,  image
      default: null,
    },
    participants: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" }, 
        hasPaid: { type: Boolean, default: false },       
        paidDate: { type: Date, default: null },        
        amountOwed: { type: Number, required: true },      
      },
    ],
    dueDate: {
      type: Date,
      required: true,
    },
    paymentHistory: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },  
        amount: { type: Number, required: true }, 
        paymentDate: { type: Date, required: true },  
      },
    ],
  },
  { timestamps: true }
);

expenseSchema.index({ room: 1 });
expenseSchema.index({ 'participants.user': 1 });

export default mongoose.model("Expense", expenseSchema);
 