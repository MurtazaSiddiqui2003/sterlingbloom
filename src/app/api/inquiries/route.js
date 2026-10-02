import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Inquiry from "../../../models/Inquiry";

const allowedEventTypes = new Set([
  "Wedding",
  "Nikah Ceremony",
  "Mehndi Event",
  "Corporate Event",
  "Private Celebration",
  "Other",
]);

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const eventType = clean(body.eventType, 80);
    const message = clean(body.message, 3000);

    if (!name || !email || !phone || !eventType || !message) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }

    if (!allowedEventTypes.has(eventType)) {
      return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
    }

    await connectDB();
    const inquiry = await Inquiry.create({ name, email, phone, eventType, message });

    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: "New Sterling Bloom inquiry",
          from_name: "Sterling Bloom Website",
          name,
          email,
          phone,
          eventType,
          message,
        }),
      });

      if (!web3Response.ok) {
        console.error("Web3Forms request failed:", web3Response.status);
      }
    }

    return NextResponse.json({ ok: true, id: inquiry._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed:", error);
    return NextResponse.json(
      { error: "We couldn't submit your inquiry right now. Please try again." },
      { status: 500 },
    );
  }
}
