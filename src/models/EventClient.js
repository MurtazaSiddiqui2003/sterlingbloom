import mongoose from "mongoose";

const eventClientSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true, maxlength: 120 },
  clientEmail: { type: String, trim: true, lowercase: true, maxlength: 254, default: "" },
  clientPhone: { type: String, trim: true, maxlength: 40, default: "" },
  eventName: { type: String, required: true, trim: true, maxlength: 160 },
  eventType: { type: String, required: true, trim: true, maxlength: 80 },
  eventDate: { type: Date, default: null },
  venue: { type: String, trim: true, maxlength: 240, default: "" },
  budget: { type: Number, min: 0, default: null },
  status: { type: String, enum: ["lead", "planning", "confirmed", "completed", "cancelled"], default: "lead", index: true },
  notes: { type: String, trim: true, maxlength: 3000, default: "" },
}, { timestamps: true });

export default mongoose.models.EventClient || mongoose.model("EventClient", eventClientSchema);
