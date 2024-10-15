import mongoose,{Schema} from "mongoose";

const calendarEventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, 
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: { type: String, default: null },
}, { timestamps: true });

calendarEventSchema.index({ startDate: 1 });

export const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
