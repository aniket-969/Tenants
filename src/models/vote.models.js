import mongoose, { Schema } from "mongoose";

const voteSchema = new Schema(
  {
    voteType: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        vote: {
          type: String,
          enum: ["yes", "no", "abstain"],
          required: true,
        },
      },
    ],
    outcome: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    voteEndTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vote", voteSchema);
