import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    eventType: { type: String, required: true, trim: true, maxlength: 80 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ["new", "contacted", "consultation", "booked", "closed"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", inquirySchema);
