import mongoose, { Schema } from "mongoose";
import { calendarEventSchema } from "./calendarEvents.model.js";

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
    calendarEvents: [calendarEventSchema],
    awards: [
      {
        awardTemplate: { type: Schema.Types.ObjectId, ref: "Award" },
        awardedTo: { type: Schema.Types.ObjectId, ref: "User" },
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
