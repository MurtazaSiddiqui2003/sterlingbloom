import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../../lib/admin-auth";
import connectDB from "../../../../../lib/mongodb";
import Inquiry from "../../../../../models/Inquiry";

const allowedStatuses = new Set([
  "new",
  "contacted",
  "consultation",
  "booked",
  "closed",
]);

export async function GET(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const inquiry = await Inquiry.findById(id).lean();

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ inquiry });
  } catch (error) {
    console.error("Admin inquiry fetch failed:", error);
    return NextResponse.json(
      { error: "Unable to load this inquiry." },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const status = String(body.status || "").trim();

    if (!allowedStatuses.has(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    await connectDB();
    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    ).lean();

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, inquiry });
  } catch (error) {
    console.error("Admin inquiry update failed:", error);
    return NextResponse.json(
      { error: "Unable to update this inquiry." },
      { status: 500 },
    );
  }
}
