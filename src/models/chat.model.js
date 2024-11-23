import mongoose, { Schema } from "mongoose";
import {Room} from '../models/rooms.model.js';
import {User} from "../models/user.model.js"

const chatSchema = new Schema(
  {
    
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        validate: [
          (val) => val.length >= 2,
          "A chat must have at least two participants.",
        ],
      },
    ],
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
