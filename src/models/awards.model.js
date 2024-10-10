import mongoose, { Schema } from "mongoose";

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

export const AwardTemplate = mongoose.model("Award", awardSchema);
