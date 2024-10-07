import { Schema } from "mongoose";

const calendarEventSchema = new Schema({
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
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', 
    }
  ],
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room', 
    required: true,
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

export default mongoose.model('CalendarEvent', calendarEventSchema);
