import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Inquiry from "../../../models/Inquiry";

const allowedEventTypes = new Set(["Wedding", "Nikah Ceremony", "Mehndi Event", "Corporate Event", "Private Celebration", "Other"]);
const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const eventType = clean(body.eventType, 80);
    const eventDate = clean(body.eventDate, 10);
    const venue = clean(body.venue, 180);
    const guestCount = clean(body.guestCount, 20);
    const budget = clean(body.budget, 80);
    const message = clean(body.message, 3000);

    if (!name || !email || !phone || !eventType || !message) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    if (!allowedEventTypes.has(eventType)) {
      return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
    }
    if (eventDate && !/^\\d{4}-\\d{2}-\\d{2}$/.test(eventDate)) {
      return NextResponse.json({ error: "Please enter a valid event date." }, { status: 400 });
    }

    await connectDB();
    const inquiry = await Inquiry.create({ name, email, phone, eventType, eventDate, venue, guestCount, budget, message });

    let emailSent = false;
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (accessKey) {
      try {
        const notification = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Sterling Bloom inquiry — ${eventType}`,
            from_name: "Sterling Bloom Website",
            name, email, phone, eventType, eventDate: eventDate || "Not provided",
            venue: venue || "Not provided", guestCount: guestCount || "Not provided",
            budget: budget || "Not provided", message,
            botcheck: "",
          }),
          cache: "no-store",
        });
        const result = await notification.json().catch(() => ({}));
        emailSent = notification.ok && result.success === true;
        if (!emailSent) console.error("Inquiry saved, but Web3Forms notification failed.");
      } catch (notificationError) {
        console.error("Inquiry saved, but notification delivery failed:", notificationError);
      }
    }

    return NextResponse.json({ ok: true, emailSent, id: inquiry._id.toString() }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission failed:", error);
    return NextResponse.json({ error: "We couldn't submit your inquiry right now. Please try again." }, { status: 500 });
  }
}
