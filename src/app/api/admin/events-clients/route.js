import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import connectDB from "../../../../lib/mongodb";
import EventClient from "../../../../models/EventClient";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    await connectDB();
    const records = await EventClient.find({}).sort({ eventDate: 1, createdAt: -1 }).limit(500).lean();
    return NextResponse.json({ records });
  } catch (error) {
    console.error("Events and clients fetch failed:", error);
    return NextResponse.json({ error: "Unable to load event records." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const body = await request.json();
    const clientName = String(body.clientName || "").trim();
    const eventName = String(body.eventName || "").trim();
    const eventType = String(body.eventType || "").trim();
    if (!clientName || !eventName || !eventType) {
      return NextResponse.json({ error: "Client name, event name, and event type are required." }, { status: 400 });
    }
    const budget = body.budget === "" || body.budget == null ? null : Number(body.budget);
    if (budget !== null && (!Number.isFinite(budget) || budget < 0)) {
      return NextResponse.json({ error: "Budget must be a valid non-negative number." }, { status: 400 });
    }
    const record = await (async () => {
      await connectDB();
      return EventClient.create({
        clientName, eventName, eventType,
        clientEmail: String(body.clientEmail || "").trim(),
        clientPhone: String(body.clientPhone || "").trim(),
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        venue: String(body.venue || "").trim(),
        budget,
        status: ["lead", "planning", "confirmed", "completed", "cancelled"].includes(body.status) ? body.status : "lead",
        notes: String(body.notes || "").trim(),
      });
    })();
    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    console.error("Event/client create failed:", error);
    return NextResponse.json({ error: "Unable to save this record." }, { status: 500 });
  }
}
