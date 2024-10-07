import mongoose,{ Schema } from 'mongoose';

const expenseSchema = new Schema({
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
    ref: 'User', 
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room', 
    required: true,
  },
  splitAmount: {
    type: Number, 
    required: true,
  },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' }, 
      hasPaid: { type: Boolean, default: false }, 
      paidDate: { type: Date, default: null }, 
    },
  ],
  dueDate: {
    type: Date, 
    required: true,
  },
  paymentHistory: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' }, 
      amount: { type: Number, required: true }, 
      paymentDate: { type: Date, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, 
  },
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
