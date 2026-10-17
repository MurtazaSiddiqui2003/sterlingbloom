import { ImageResponse } from "next/og";

export const alt = "Sterling Bloom — Luxury Event Decor & Styling";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#1d1813", color: "#f8f7f4", padding: "72px", fontFamily: "Georgia, serif", textAlign: "center" }}>
      <div style={{ width: "76px", height: "2px", background: "#d6b56d", marginBottom: "42px" }} />
      <div style={{ fontSize: 30, letterSpacing: "0.28em", color: "#d6b56d", textTransform: "uppercase" }}>Sterling Bloom</div>
      <div style={{ fontSize: 68, lineHeight: 1.12, marginTop: "28px", maxWidth: "950px" }}>Luxury Event Decor &amp; Styling</div>
      <div style={{ fontSize: 25, color: "#d9d0c2", marginTop: "30px", letterSpacing: "0.08em" }}>Beautifully considered. Meaningfully remembered.</div>
      <div style={{ width: "76px", height: "2px", background: "#d6b56d", marginTop: "42px" }} />
    </div>,
    size,
  );
}
