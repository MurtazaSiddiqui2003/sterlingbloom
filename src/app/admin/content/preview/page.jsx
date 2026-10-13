"use client";

import { useEffect, useState } from "react";
import Hero from "../../components/hero";
import About from "../../components/about";
import Services from "../../components/services";
import Gallery from "../../components/gallery";
import Process from "../../components/process";
import Packages from "../../components/packages";
import Testimonials from "../../components/testimonials";
import InstagramStrip from "../../components/instagram-strip";
import Contact from "../../components/contact";
import CalendlyBooking from "../../components/calendly-booking";

export default function ContentPreviewPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    function receive(event) {
      if (event.origin !== window.location.origin || event.data?.type !== "STERLING_BLOOM_DRAFT") return;
      setContent(event.data.content);
    }
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "STERLING_BLOOM_PREVIEW_READY" }, window.location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);

  if (!content) return <main className="grid min-h-screen place-items-center bg-[#F8F7F4] px-6 text-center text-[#211D19]"><p className="text-sm">Waiting for your draft preview…</p></main>;
  const design = content.design || {};
  const colors = design.colors || {};
  const layout = design.layout || {};
  const style = {
    "--sb-page-bg": colors.background || "#F8F7F4",
    "--sb-surface": colors.surface || "#FFFFFF",
    "--sb-text": colors.text || "#211D19",
    "--sb-muted": colors.mutedText || "#66615B",
    "--sb-accent": colors.accent || "#B68A35",
    "--sb-accent-light": colors.accentLight || "#D6B56D",
    "--sb-content-width": String(layout.contentWidth || 1280) + "px",
    "--sb-section-spacing": String(layout.sectionSpacing || 80) + "px",
    "--sb-card-radius": String(layout.cardRadius ?? 20) + "px",
  };
  return <div style={style} className="min-h-screen bg-[var(--sb-page-bg)] text-[var(--sb-text)]">
    <div className="sticky top-0 z-50 border-b border-black/10 bg-white/95 px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[.16em] text-[#8A682A]">Live draft preview · Not published</div>
    <main>
      <Hero content={content.hero} />
      <About content={content.about} />
      <Services content={content.services} />
      <Gallery content={content.gallery} />
      <Process content={content.process} />
      <Packages content={content.packages} />
      <Testimonials content={content.testimonials} />
      <InstagramStrip content={content.instagramStrip} />
      <CalendlyBooking content={content.calendly} />
      <Contact content={content.contact} />
    </main>
  </div>;
}
