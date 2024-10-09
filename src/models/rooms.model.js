import mongoose, { Schema } from "mongoose";
import voteModels from "./vote.model";

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
        type: Schema.Types.ObjectId,
        ref: "Award",
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

export default mongoose.model("Room", roomSchema);
