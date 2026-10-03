import { NextResponse } from "next/server";

const CALENDLY_API = "https://api.calendly.com";

export async function GET() {
  const token = process.env.CALENDLY_API_KEY;

  if (!token) {
    return NextResponse.json(
      { configured: false, error: "Calendly is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const userResponse = await fetch(`${CALENDLY_API}/users/me`, {
      headers,
      cache: "no-store",
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { configured: false, error: "Calendly authentication failed." },
        { status: 502 },
      );
    }

    const userData = await userResponse.json();
    const user = userData.resource;

    const eventResponse = await fetch(
      `${CALENDLY_API}/event_types?user=${encodeURIComponent(user.uri)}&active=true`,
      { headers, cache: "no-store" },
    );

    if (!eventResponse.ok) {
      return NextResponse.json(
        { configured: false, error: "Unable to load Calendly event types." },
        { status: 502 },
      );
    }

    const eventData = await eventResponse.json();
    const events = (eventData.collection || [])
      .filter((event) => event.active !== false && event.scheduling_url)
      .map((event) => ({
        name: event.name,
        duration: event.duration,
        schedulingUrl: event.scheduling_url,
        uri: event.uri,
      }));

    const preferredName = process.env.CALENDLY_EVENT_TYPE_NAME?.trim();
    const selected =
      events.find((event) =>
        preferredName
          ? event.name.toLowerCase() === preferredName.toLowerCase()
          : false,
      ) || events[0];

    return NextResponse.json({
      configured: Boolean(selected?.schedulingUrl),
      user: user.name || "",
      schedulingUrl: selected?.schedulingUrl || user.scheduling_url || "",
      eventTypes: events,
    });
  } catch (error) {
    console.error("Calendly integration failed:", error);
    return NextResponse.json(
      { configured: false, error: "Unable to connect to Calendly." },
      { status: 500 },
    );
  }
}
