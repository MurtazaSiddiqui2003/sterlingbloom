"use client";

import { useState } from "react";

export default function ReviewForm() {
  const [status, setStatus] = useState("idle");

  async function submit(event) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    <div className="mx-auto mt-10 max-w-3xl rounded-[22px] border border-[#D6B56D]/40 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#B68A35]">SHARE YOUR EXPERIENCE</p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium text-gray-900">Leave a Review</h3>
        <p className="mt-2 text-sm leading-6 text-gray-500">Tell us about your Sterling Bloom experience. Every review is checked by our team before it appears publicly.</p>
      </div>
      <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" />
        <input name="email" required type="email" placeholder="Your email (kept private)" className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" />
        <input name="event" required placeholder="Event type" className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" />
        <div className="hidden sm:block" />
        <textarea name="review" required minLength={15} rows={5} placeholder="How was your experience?" className="sm:col-span-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#B68A35]" />
        <label className="sm:col-span-2 flex items-start gap-3 text-xs leading-5 text-gray-500">
          <input name="consent" value="yes" type="checkbox" required className="mt-1" />
          <span>I agree that Sterling Bloom may publish my review on its website after approval.</span>
        </label>
        {status === "success" && <p role="status" className="sm:col-span-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Thank you. Your review has been submitted for approval.</p>}
        {status === "error" && <p role="alert" className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">We couldn't submit your review. Please try again.</p>}
        <button disabled={status === "loading"} className="btn-primary sm:col-span-2 w-full py-3.5 disabled:opacity-60">{status === "loading" ? "Submitting..." : "Submit Review"}</button>
      </form>
    </div>
  );
}
