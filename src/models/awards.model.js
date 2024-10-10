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
    awardedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    awardedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    criteria: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Award", awardSchema);

export default mongoose.model("Award", awardSchema);
