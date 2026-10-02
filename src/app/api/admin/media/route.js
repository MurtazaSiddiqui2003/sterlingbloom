import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import connectDB from "../../../../lib/mongodb";
import Media from "../../../../models/Media";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    await connectDB();
    const items = await Media.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Media list failed:", error);
    return NextResponse.json({ error: "Unable to load media." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const body = await request.json();
    if (!body?.publicId || !body?.secureUrl) {
      return NextResponse.json({ error: "publicId and secureUrl are required." }, { status: 400 });
    }

    await connectDB();
    const item = await Media.findOneAndUpdate(
      { publicId: body.publicId },
      {
        $set: {
          url: body.url || body.secureUrl,
          secureUrl: body.secureUrl,
          resourceType: body.resourceType || "image",
          format: body.format || "",
          folder: body.folder || "sterling-bloom",
          title: body.title || "",
          alt: body.alt || "",
          tags: Array.isArray(body.tags) ? body.tags.slice(0, 30) : [],
          bytes: Number(body.bytes) || 0,
          width: Number(body.width) || 0,
          height: Number(body.height) || 0,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ).lean();

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    console.error("Media save failed:", error);
    return NextResponse.json({ error: "Unable to save media record." }, { status: 500 });
  }
}
