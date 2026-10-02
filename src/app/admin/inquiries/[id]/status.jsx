"use client";

import { useState } from "react";

const statuses = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["consultation", "Consultation"],
  ["booked", "Booked"],
  ["closed", "Closed"],
];

export default function InquiryStatus({ inquiryId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function updateStatus(event) {
    const nextStatus = event.target.value;
    setStatus(nextStatus);
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) throw new Error("Status update failed.");
    } catch {
      setStatus(initialStatus);
      setError("Could not save status.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="sm:text-right">
      <label htmlFor="inquiry-status" className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
        Pipeline Status
      </label>
      <select
        id="inquiry-status"
        value={status}
        onChange={updateStatus}
        disabled={saving}
        className="rounded-[10px] border border-[#D6B56D] bg-white px-4 py-3 text-sm font-medium text-[#8C6824] outline-none focus:ring-2 focus:ring-[#B68A35]/10 disabled:opacity-60"
      >
        {statuses.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {saving && <p className="mt-2 text-xs text-gray-400">Saving…</p>}
    </div>
  );
}
