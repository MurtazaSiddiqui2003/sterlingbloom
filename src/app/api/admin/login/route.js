import { NextResponse } from "next/server";
import { COOKIE_NAME, createAdminSession } from "../../../../lib/admin-auth";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const configuredPassword = process.env.ADMIN_PASSWORD;

    if (!configuredPassword) {
      return NextResponse.json(
        { error: "Admin authentication is not configured yet." },
        { status: 503 },
      );
    }

    if (!password || password !== configuredPassword) {
      return NextResponse.json(
        { error: "Invalid password." },
        { status: 401 },
      );
    }

    const token = await createAdminSession();
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in right now." },
      { status: 400 },
    );
  }
}
