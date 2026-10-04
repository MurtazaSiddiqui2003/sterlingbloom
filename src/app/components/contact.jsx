"use client";

import { useState } from "react";

const eventLabels = {
  wedding: "Wedding",
  nikah: "Nikah Ceremony",
  mehndi: "Mehndi Event",
  corporate: "Corporate Event",
  private: "Private Celebration",
};

export default function Contact({ content }) {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const eventType = eventLabels[payload.event] || "Other";

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, eventType }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Submission failed.");

      let emailSent = false;
      const keyResponse = await fetch("/api/web3forms-config", { cache: "no-store" });
      const keyData = await keyResponse.json();

      if (keyData.configured && keyData.accessKey) {
        const web3Response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: keyData.accessKey,
            subject: "New Sterling Bloom inquiry",
            from_name: "Sterling Bloom Website",
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            eventType,
            message: payload.message,
            botcheck: false,
          }),
        });
        const web3Data = await web3Response.json().catch(() => ({}));
        emailSent = web3Response.ok && web3Data.success === true;
      }

      form.reset();
      setStatus(emailSent ? "success" : "email-error");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section data-reveal id="contact" className="relative overflow-hidden bg-[#2A2118] py-20 sm:py-24 lg:py-28">
      {content.backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${content.backgroundImage}")` }}
          aria-hidden="true"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[#2A2118]/88" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-white lg:sticky lg:top-28">
            <p className="inline-flex border border-[#C9A45C] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#D6B56D] sm:text-xs">{content.eyebrow}</p>
            <h2 className="mt-7 max-w-xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">{content.heading}<span className="block text-[#D6B56D]">{content.highlight}</span></h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">{content.description}</p>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              <a href={`tel:${String(content.phone || "").replace(/[^+\\d]/g, "")}`} className="transition hover:text-[#D6B56D]"><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Phone</p><p className="mt-1 text-sm text-white/80">{content.phone}</p></a>
              <a href={`mailto:${content.email || ""}`} className="transition hover:text-[#D6B56D]"><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Email</p><p className="mt-1 text-sm text-white/80">{content.email}</p></a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.location || "")}`} target="_blank" rel="noreferrer" className="transition hover:text-[#D6B56D]"><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Location</p><p className="mt-1 text-sm text-white/80">{content.location}</p></a>
              <div><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Hours</p><p className="mt-1 text-sm leading-6 text-white/80">{content.hours}</p></div>
            </div>
            <p className="mt-8 border-l border-[#B68A35] pl-4 text-xs leading-6 text-white/45">{content.note}</p>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-2xl shadow-black/20 sm:p-9 lg:p-10">
            <div className="mb-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B68A35]">{content.formEyebrow}</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium text-gray-900 sm:text-4xl">{content.formHeading}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">{content.formDescription}</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {[
                ["name", "Your Name", "text", "Enter your name"],
                ["email", "Email Address", "email", "Enter your email"],
                ["phone", "Phone Number", "tel", "Enter your phone number"],
              ].map(([id, label, type, placeholder]) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">{label}</label>
                  <input id={id} name={id} type={type} placeholder={placeholder} required autoComplete={id === "name" ? "name" : id === "email" ? "email" : "tel"} className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10" />
                </div>
              ))}
              <div>
                <label htmlFor="event" className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">Event Type</label>
                <select id="event" name="event" defaultValue="" required className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-600 outline-none transition focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10">
                  <option value="" disabled>Select an event</option>
                  <option value="wedding">Wedding</option><option value="nikah">Nikah</option><option value="mehndi">Mehndi</option><option value="corporate">Corporate Event</option><option value="private">Private Celebration</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">Tell Us About Your Event</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us about your event, date, venue, and vision..." required className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10" />
              </div>

              {status === "success" && <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Thank you. Your inquiry has been received and the notification email has been sent.</p>}
              {status === "email-error" && <p role="status" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">Your inquiry was saved, but the notification email could not be sent. Please check the Web3Forms access key and verified recipient email.</p>}
              {status === "error" && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">We couldn't submit your inquiry. Please try again.</p>}

              <button type="submit" disabled={status === "loading"} className="btn-primary w-full rounded-[2px] py-4 text-xs uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-60">
                {status === "loading" ? "Sending..." : content.formButton}
              </button>
            </form>
            <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">{content.formFootnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
