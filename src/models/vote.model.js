import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
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
    voteEndTime: {
      type: string,
      required: true,
    },

    options: [
      {
        optionText: {
          type: String,
          required: true,
        },
        votes: [
          {
            voter: {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          },
        ],
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

voteSchema.index({ room: 1, 'options.votes.voter': 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
