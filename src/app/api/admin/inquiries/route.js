import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import connectDB from "../../../../lib/mongodb";
import Inquiry from "../../../../models/Inquiry";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const inquiries = await Inquiry.find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error("Admin inquiries fetch failed:", error);
    return NextResponse.json(
      { error: "Unable to load inquiries right now." },
      { status: 500 },
    );
  }
}
