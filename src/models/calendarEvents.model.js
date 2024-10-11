const calendarEventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room', required: true }, // Reference to the room
  isRecurring: { type: Boolean, default: false },
  recurrencePattern: { type: String, default: null },
}, { timestamps: true });

export const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);
