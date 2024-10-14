import mongoose, { Schema } from "mongoose";
import { awardSchema } from "./awards.model";

const maintenanceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved", "cancelled"],
    default: "pending",
  },
  maintenanceProvider: {
    type: String,
    default: null,
  },
  contactPhone: {
    type: String,
    default: null,
  },
  costEstimate: {
    type: Number,
    default: 0,
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
  dateResolved: {
    type: Date,
  },
});

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
    awards: [awardSchema],
    maintenanceRequests: [maintenanceSchema],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
