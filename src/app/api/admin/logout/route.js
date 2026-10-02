import { NextResponse } from "next/server";
import { COOKIE_NAME } from "../../../../lib/admin-auth";

export async function POST(request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
