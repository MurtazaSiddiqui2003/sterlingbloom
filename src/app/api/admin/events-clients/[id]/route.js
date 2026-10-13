import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import connectDB from "../../../../../lib/mongodb";
import EventClient from "../../../../../models/EventClient";

const statuses = new Set(["lead", "planning", "confirmed", "completed", "cancelled"]);

export async function PATCH(request, { params }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid record ID." }, { status: 400 });
    const body = await request.json();
    const update = {};
    if (typeof body.status === "string" && statuses.has(body.status)) update.status = body.status;
    if (typeof body.notes === "string") update.notes = body.notes.trim().slice(0, 3000);
    if (typeof body.venue === "string") update.venue = body.venue.trim().slice(0, 240);
    if (typeof body.budget !== "undefined") {
      const budget = body.budget === "" || body.budget == null ? null : Number(body.budget);
      if (budget !== null && (!Number.isFinite(budget) || budget < 0)) return NextResponse.json({ error: "Invalid budget." }, { status: 400 });
      update.budget = budget;
    }
    await connectDB();
    const record = await EventClient.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true }).lean();
    if (!record) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ record });
  } catch (error) {
    console.error("Event/client update failed:", error);
    return NextResponse.json({ error: "Unable to update this record." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return NextResponse.json({ error: "Invalid record ID." }, { status: 400 });
    await connectDB();
    const record = await EventClient.findByIdAndDelete(id);
    if (!record) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Event/client delete failed:", error);
    return NextResponse.json({ error: "Unable to delete this record." }, { status: 500 });
  }
}
