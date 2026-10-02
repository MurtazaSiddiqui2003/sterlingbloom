"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          eventType:
            payload.event === "wedding" ? "Wedding" :
            payload.event === "nikah" ? "Nikah Ceremony" :
            payload.event === "mehndi" ? "Mehndi Event" :
            payload.event === "corporate" ? "Corporate Event" :
            payload.event === "private" ? "Private Celebration" :
            "Other",
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Submission failed.");

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <section data-reveal id="contact" className="relative overflow-hidden bg-[#2A2118] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-white lg:sticky lg:top-28">
            <p className="inline-flex border border-[#C9A45C] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#D6B56D] sm:text-xs">
              LET'S CREATE TOGETHER
            </p>
            <h2 className="mt-7 max-w-xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              Let's Create Something
              <span className="block text-[#D6B56D]">Beautiful Together</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Tell us about your event, your vision, and the experience you want to create. Our team would love to help bring it to life.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
              <div><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Phone</p><p className="mt-1 text-sm text-white/80">+92 300 1234567</p></div>
              <div><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Email</p><p className="mt-1 text-sm text-white/80">hello@sterlingbloom.com</p></div>
              <div><p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#D6B56D]">Location</p><p className="mt-1 text-sm text-white/80">Karachi, Pakistan</p></div>
            </div>
            <p className="mt-8 border-l border-[#B68A35] pl-4 text-xs leading-6 text-white/45">
              Final details, availability, and pricing are discussed during your consultation.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-2xl shadow-black/20 sm:p-9 lg:p-10">
            <div className="mb-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B68A35]">INQUIRY FORM</p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium text-gray-900 sm:text-4xl">Start Your Celebration</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">Share a few details and we will get back to you about your event.</p>
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
                  <option value="wedding">Wedding</option>
                  <option value="nikah">Nikah</option>
                  <option value="mehndi">Mehndi</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="private">Private Celebration</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500 sm:text-xs">Tell Us About Your Event</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us about your event, date, venue, and vision..." required className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10" />
              </div>

              {status === "success" && <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Thank you. Your inquiry has been received.</p>}
              {status === "error" && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">We couldn't submit your inquiry. Please try again.</p>}

              <button type="submit" disabled={status === "loading"} className="btn-primary w-full rounded-lg py-4 text-xs uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-60">
                {status === "loading" ? "Sending..." : "Request Consultation"}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">We’ll review your inquiry and follow up with next steps.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
