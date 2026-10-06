import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { getSiteContent } from "../lib/site-content";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

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

  return (
    <html
      lang="en"
      className={displayFont.variable + " " + bodyFont.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        <Navbar content={content.nav} />
        {children}
        <Footer content={content.footer} contact={content.contact} />
      </body>
    </html>
  );
}
