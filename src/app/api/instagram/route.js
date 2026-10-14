import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ items: [], configured: false }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const url = new URL("https://graph.instagram.com/me/media");
    url.searchParams.set("fields", "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}");
    url.searchParams.set("limit", "12");
    url.searchParams.set("access_token", accessToken);

    const response = await fetch(url, { next: { revalidate: 900 } });
    const data = await response.json();
    if (!response.ok) {
      console.error("Instagram feed request failed:", data?.error?.message || response.status);
      return NextResponse.json({ items: [], configured: true, error: "Instagram feed is temporarily unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
    }

    const items = (data.data || [])
      .filter((item) => item.media_type !== "VIDEO" || item.thumbnail_url || item.media_url)
      .slice(0, 6)
      .map((item) => ({
        id: item.id,
        image: item.media_type === "VIDEO" ? (item.thumbnail_url || item.media_url) : item.media_url,
        alt: item.caption?.slice(0, 180) || "Latest Sterling Bloom Instagram post",
        permalink: item.permalink,
        timestamp: item.timestamp,
      }))
      .filter((item) => item.image && item.permalink);

    return NextResponse.json({ items, configured: true }, { headers: { "Cache-Control": "s-maxage=900, stale-while-revalidate=3600" } });
  } catch (error) {
    console.error("Instagram feed error:", error);
    return NextResponse.json({ items: [], configured: true, error: "Instagram feed is temporarily unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
