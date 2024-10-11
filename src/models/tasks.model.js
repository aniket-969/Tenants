import mongoose, { Schema } from "mongoose";

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

export default mongoose.model("Task", taskSchema);
