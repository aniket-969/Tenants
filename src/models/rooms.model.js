import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tenants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    calendarEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "CalendarEvent",
      },
    ],
    awards: [
      {
        awardTemplate: { type: Schema.Types.ObjectId, ref: 'Award' }, 
        awardedTo: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
    maintenanceRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "MaintenanceRequest",
      },
    ],
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
