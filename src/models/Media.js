import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    publicId: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    resourceType: { type: String, enum: ["image", "video", "raw"], default: "image" },
    format: { type: String, default: "" },
    folder: { type: String, default: "sterling-bloom" },
    title: { type: String, trim: true, maxlength: 160, default: "" },
    alt: { type: String, trim: true, maxlength: 300, default: "" },
    tags: { type: [String], default: [] },
    bytes: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Media || mongoose.model("Media", mediaSchema);
