import mongoose,{Schema} from "mongoose";

const calendarEventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, 
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: { type: String, default: null },
}, { timestamps: true });

export const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
