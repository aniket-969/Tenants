import mongoose, { Schema } from "mongoose";

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
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
  },
  { timestamps: true }
);

chatSchema.pre("save", function (next) {
  if (this.participants.length < 2) {
    next(new Error("A chat must have at least two participants."));
  }
  next();
});
chatSchema.index({ room: 1 });
chatMessageSchema.index({ chat: 1, createdAt: -1 });

export const Chat = mongoose.model("Chat", chatSchema);
