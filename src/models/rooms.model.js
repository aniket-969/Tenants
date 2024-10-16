import mongoose, { Schema } from "mongoose";

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

const awardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    criteria: {
      type: String,
    },
  },
  { timestamps: true }
);

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    currentAssignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    rotationOrder: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    switches: [
      {
        requestedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        acceptedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    switchCountPerUser: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        requestCount: { type: Number, default: 0 },  
        acceptCount: { type: Number, default: 0 },   
      },
    ],
    completedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    recurrencePattern: {
      type: String,
      enum: ["daily", "weekly", "monthly", "custom"],
    },
    customRecurrence: {
      type: String,
    },
  },
  { timestamps: true }
);

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
    awards: [awardSchema],
    maintenanceRequests: [maintenanceSchema],
    tasks: [taskSchema],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  },
  { timestamps: true }
);

taskSchema.index({ dueDate: 1 });
taskSchema.index({ currentAssignee: 1 });
taskSchema.index({ completed: 1 });

export const Room = mongoose.model("Room", roomSchema);
