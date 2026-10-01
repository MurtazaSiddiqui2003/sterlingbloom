import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

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

export const metadata = {
  title: "Sterling Bloom | Luxury Event Decor",
  description:
    "Sterling Bloom creates refined event design and decor for weddings, corporate events, and private celebrations.",
  keywords:
    "Sterling Bloom, luxury event decor, wedding decor, event design, event styling, corporate event decor, private celebrations",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={displayFont.variable + " " + bodyFont.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
