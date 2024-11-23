import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: {
      type: [
        {
          url: String,
          localPath: String,
          type: {
            type: String,
            enum: ["image", "pdf", "other"],
            default: "other",
          },
        },
      ],
      default: [],
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
  },
  { timestamps: true }
);

chatMessageSchema.index({ chat: 1 });
chatMessageSchema.index({ content: "text" });

export const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);
