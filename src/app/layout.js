import Script from "next/script";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ThemeToggle from "./components/theme-toggle";
import { getSiteContent } from "../lib/site-content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sterling Bloom | Luxury Event Decor",
  description:
    "Sterling Bloom creates refined event design and decor for weddings, corporate events, and private celebrations.",
  keywords:
    "Sterling Bloom, luxury event decor, wedding decor, event design, event styling, corporate event decor, private celebrations",
};

export default async function RootLayout({ children }) {
  const content = await getSiteContent();
  const design = content.design || {};
  const colors = design.colors || {};
  const layout = design.layout || {};
  const designStyle = {
    "--sb-page-bg": colors.background || "#F8F7F4",
    "--sb-surface": colors.surface || "#FFFFFF",
    "--sb-text": colors.text || "#211D19",
    "--sb-muted": colors.mutedText || "#66615B",
    "--sb-accent": colors.accent || "#B68A35",
    "--sb-accent-light": colors.accentLight || "#D6B56D",
    "--sb-dark": colors.dark || "#1D1813",
    "--sb-content-width": String(layout.contentWidth || 1280) + "px",
    "--sb-section-spacing": String(layout.sectionSpacing || 80) + "px",
    "--sb-card-radius": String(layout.cardRadius ?? 20) + "px",
    "--sb-card-padding": String(layout.cardPadding || 24) + "px",
  };

  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-site-theme={design.theme || "light"}
      style={designStyle}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        {content.visibility?.nav !== false && <Navbar content={content.nav} />}
        <ThemeToggle />
        {children}
        {content.visibility?.footer !== false && <Footer content={content.footer} contact={content.contact} />}
      </body>
    </html>
  );
}
