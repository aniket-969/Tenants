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
    ,
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true, 
    },
  },
  { timestamps: true }
);

voteSchema.index({ _id: 1, "votes.voter": 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);