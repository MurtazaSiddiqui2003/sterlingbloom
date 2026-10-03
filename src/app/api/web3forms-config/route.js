import { NextResponse } from "next/server";

export async function GET() {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  return NextResponse.json(
    { configured: Boolean(accessKey), accessKey: accessKey || "" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
