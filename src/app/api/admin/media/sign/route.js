import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import { cloudinaryConfig, isCloudinaryConfigured, signCloudinaryParams } from "../../../../lib/cloudinary";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!isCloudinaryConfigured()) return NextResponse.json({ error: "Cloudinary is not configured." }, { status: 503 });

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "sterling-bloom";
  const signature = signCloudinaryParams({ folder, timestamp });
  const { cloudName, apiKey } = cloudinaryConfig();

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature,
  });
}
