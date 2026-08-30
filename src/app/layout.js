import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sterling Bloom | Luxury Event Decor",
  description: "Sterling Bloom is a premier event design and decor company specializing in creating unforgettable experiences for weddings, corporate events, and private celebrations. Our team of expert designers and decorators work closely with clients to bring their vision to life, ensuring every detail is meticulously crafted to perfection.",
  keywords: "Sterling Bloom, Luxury Event Decor, Event Design, Wedding Decor, Corporate Event Decor, Private Celebration Decor, Custom Event Design, Elegant Event Design, Event Planning, Event Styling, Event Coordination, Event Management, Event Production, Event Rentals, Event Lighting, Event Florals, Event Furniture, Event Draping, Event Signage, Event Branding, Event Marketing, Event Photography, Event Videography, Event Entertainment, Event Catering, Event Bar Service, Event Staffing, Event Security, Event Transportation , Event Technology, Event Audio Visual, Event Staging, Event Theming, Event Concept Development, Event Budgeting, Event Timeline Management, Event Vendor Management, Event Contract Negotiation, Event Risk Management, Event Insurance, Event Permits and Licenses, Event Sustainability, Event Accessibility, Event Inclusivity, Event Diversity, Event Cultural Sensitivity, Event Social Responsibility, Event Community Engagement, Event Philanthropy, Event Fundraising, Event Sponsorship, Event Public Relations, Event Media Coverage, Event Press Releases, Event Influencer Marketing, Event Social Media Management, Event Content Creation, Event Blogging, Event Podcasting, Event Video Production, Event Live Streaming, Event Virtual Events, Event Hybrid Events, Event Experiential Marketing, Event Brand Activation, Event Product Launches, Event Trade Shows, Event Conferences, Event Seminars, Event Workshops, Event Retreats, Event Team Building Activities",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
