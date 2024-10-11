import mongoose,{ Schema } from "mongoose";

export const calendarEventSchema = new Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String, 
  },
  startDate: {
    type: Date,
    required: true, 
  },
  endDate: {
    type: Date, 
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },
  isRecurring: {
    type: Boolean,
    default: false, 
  },
  recurrencePattern: {
    type: String, 
    default: null,
  }
}, { timestamps: true });

