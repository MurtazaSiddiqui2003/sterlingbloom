import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import connectDB from "../../../../lib/mongodb";
import SiteContent from "../../../../models/SiteContent";
import { defaultSiteContent } from "../../../../lib/site-content";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const record = await SiteContent.findOne({ key: "main" }).lean();
    return NextResponse.json({
      content: record?.content || defaultSiteContent,
    });
  } catch (error) {
    console.error("Admin content fetch failed:", error);
    return NextResponse.json({ error: "Unable to load website content." }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const content = await request.json();
    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
    }

    await connectDB();
    const record = await SiteContent.findOneAndUpdate(
      { key: "main" },
      { $set: { content } },
      { upsert: true, new: true, runValidators: true },
    ).lean();

    return NextResponse.json({ ok: true, content: record.content });
  } catch (error) {
    console.error("Admin content save failed:", error);
    return NextResponse.json({ error: "Unable to save website content." }, { status: 500 });
  }
}
