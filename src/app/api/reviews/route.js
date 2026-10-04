import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Review from "../../../models/Review";

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const event = clean(body.event, 100);
    const review = clean(body.review, 1500);

    if (!name || !email || !event || !review) {
      return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (review.length < 15) {
      return NextResponse.json({ error: "Please share a little more about your experience." }, { status: 400 });
    }

    await connectDB();
    await Review.create({ name, email, event, review, status: "pending" });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Review submission failed:", error);
    return NextResponse.json({ error: "We couldn't submit your review right now. Please try again." }, { status: 500 });
  }
}
