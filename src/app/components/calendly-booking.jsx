"use client";

import { openCalendly } from "../../lib/calendly-popup";

export default function CalendlyBooking({ content }) {
  return (
    <section id="consultation" data-reveal className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="relative overflow-hidden border border-[#B68A35]/25 bg-white px-6 py-14 text-center shadow-xl shadow-black/5 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-[#B68A35]" />
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl">{content.heading}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">{content.description}</p>
          <button type="button" onClick={openCalendly} className="btn-primary mt-8 px-8 py-3.5">
            Book a 30-Minute Consultation
          </button>
          <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gray-400">
            Your consultation opens securely in a popup
          </p>

        </div>
      </div>
    </section>
  );
}
