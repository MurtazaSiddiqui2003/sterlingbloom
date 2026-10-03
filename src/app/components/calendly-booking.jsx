"use client";

import { useEffect, useState } from "react";

const DIRECT_CALENDLY_URL = "https://calendly.com/murtazasiddiqui250/30min";

export default function CalendlyBooking({ content }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/calendly", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => { if (active) setBooking(data); })
      .catch(() => { if (active) setBooking({ configured: false }); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const schedulingUrl = booking?.schedulingUrl || DIRECT_CALENDLY_URL;

  return (
    <section id="consultation" data-reveal className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-heading mt-5">{content.heading}</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">{content.description}</p>
          <a href={DIRECT_CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary mt-7 rounded-[2px] px-7 py-3.5">
            Book a 30-Minute Consultation
          </a>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2px] border border-black/10 bg-white shadow-xl shadow-black/5">
          {loading ? (
            <div className="flex min-h-[520px] items-center justify-center text-sm text-gray-400">Loading consultation availability…</div>
          ) : booking?.configured && booking.schedulingUrl ? (
            <iframe title="Book a consultation with Sterling Bloom" src={`${schedulingUrl}?hide_gdpr_banner=1`} className="h-[760px] w-full border-0 sm:h-[800px]" loading="lazy" />
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B68A35]">CONSULTATION BOOKING</p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-medium">Book directly through Calendly</h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">Choose a convenient time for your consultation and we’ll take it from there.</p>
              <a href={DIRECT_CALENDLY_URL} target="_blank" rel="noreferrer" className="btn-primary mt-7 rounded-[2px] px-6 py-3 text-xs uppercase tracking-[0.16em]">Open Calendly</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
