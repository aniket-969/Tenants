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
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completionDate: {
      type: Date,
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
        switchDate: {
          type: Date,
        },
      },
    ],
    switchesAccepted: {
      type: Number,
      default: 0,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    recurrencePattern: {
      type: String,
      default: null,
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

export const Room = mongoose.model("Room", roomSchema);
