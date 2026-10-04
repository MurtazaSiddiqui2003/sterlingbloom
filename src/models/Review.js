import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    event: { type: String, required: true, trim: true, maxlength: 100 },
    review: { type: String, required: true, trim: true, maxlength: 1500 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
