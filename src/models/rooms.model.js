import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      
    },
    groupCode:{
      type:String,
      required:true,
      unique:true,
      length:6,
    },
    admin:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
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
    pendingRequests: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: ['tenant', 'landlord'], required: true },
      requestedAt: { type: Date, default: Date.now }
    }],
    awards: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
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
        assignedTo: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    maintenanceRequests: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
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
    tasks: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
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
              required: true,
            },
            requestedTo: {
              userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
              },
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
    ],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  },
  { timestamps: true }
);

roomSchema.index({ "tasks.dueDate": 1 });
roomSchema.index({ "tasks.currentAssignee": 1 });
roomSchema.index({ "tasks.createdBy": 1 });
roomSchema.index({ "tasks.participants": 1 });
roomSchema.index({ "tasks.recurring": 1, "tasks.recurrencePattern": 1 });
roomSchema.index({ "maintenanceRequests.status": 1 });
roomSchema.index({ "maintenanceRequests.dateReported": 1 });
roomSchema.index({ "maintenanceRequests.dateResolved": 1 });

export const Room = mongoose.model("Room", roomSchema);
