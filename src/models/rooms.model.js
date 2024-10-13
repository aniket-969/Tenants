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
      },
    ],
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
