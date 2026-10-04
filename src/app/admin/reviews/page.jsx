"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const response = await fetch("/api/admin/reviews", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    setReviews(data.reviews || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await load();
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#211d19]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-xs uppercase tracking-[0.14em] text-gray-400 hover:text-[#B68A35]">← Dashboard</Link>
            <div className="hidden h-5 w-px bg-gray-200 sm:block" />
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium">Customer Reviews</h1>
          </div>
          <form action="/api/admin/logout" method="POST"><button className="rounded-[10px] border border-gray-200 px-4 py-2.5 text-xs uppercase tracking-[0.15em] text-gray-600">Sign Out</button></form>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <p className="eyebrow">REVIEW MODERATION</p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-medium">Approve real client feedback.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500">New customer reviews stay private until you approve them. Approved reviews automatically appear on the public Testimonials section.</p>
        <div className="mt-8 space-y-4">
          {loading ? <p className="text-sm text-gray-500">Loading reviews…</p> : reviews.length === 0 ? <p className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">No customer reviews yet.</p> : reviews.map((review) => (
            <article key={review._id} className="rounded-[20px] border border-gray-200 bg-white p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><h3 className="font-[family-name:var(--font-display)] text-2xl font-medium">{review.name}</h3><p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#B68A35]">{review.event}</p><p className="mt-2 text-xs text-gray-400">{review.email}</p></div>
                <span className={"rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.16em] " + (review.status === "approved" ? "bg-green-50 text-green-700" : review.status === "rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700")}>{review.status}</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-gray-600">“{review.review}”</p>
              <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                {review.status !== "approved" && <button onClick={() => updateStatus(review._id, "approved")} className="rounded-[8px] bg-[#B68A35] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white">Approve & Publish</button>}
                {review.status !== "rejected" && <button onClick={() => updateStatus(review._id, "rejected")} className="rounded-[8px] border border-gray-200 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-gray-600">Reject</button>}
                {review.status !== "pending" && <button onClick={() => updateStatus(review._id, "pending")} className="rounded-[8px] border border-gray-200 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-gray-600">Move to Pending</button>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
