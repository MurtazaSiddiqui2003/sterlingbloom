"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const initialForm = { clientName: "", clientEmail: "", clientPhone: "", eventName: "", eventType: "Wedding", eventDate: "", venue: "", budget: "", status: "lead", notes: "" };
const statuses = [
  ["lead", "Lead"], ["planning", "Planning"], ["confirmed", "Confirmed"], ["completed", "Completed"], ["cancelled", "Cancelled"],
];
const inputClass = "w-full border border-white/15 bg-[#211f1c] px-3 py-2.5 text-sm text-[#f5f0e8] outline-none transition focus:border-[#c9a45e]";

function formatDate(date) {
  if (!date) return "Date not set";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(date));
}

export default function EventsClientsPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/events-clients");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load records.");
      setRecords(data.records || []);
      setError("");
    } catch (err) { setError(err.message || "Could not load records."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadRecords(); }, [loadRecords]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records.filter((r) => !q || [r.clientName, r.clientEmail, r.clientPhone, r.eventName, r.eventType, r.venue, r.status].some((v) => String(v || "").toLowerCase().includes(q)));
  }, [records, search]);

  function change(key, value) { setForm((current) => ({ ...current, [key]: value })); }

  async function createRecord(event) {
    event.preventDefault();
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/events-clients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save record.");
      setRecords((current) => [data.record, ...current]);
      setForm(initialForm);
      setNotice("Event and client record saved.");
    } catch (err) { setError(err.message || "Could not save record."); }
    finally { setSaving(false); }
  }

  async function updateRecord(id, patch) {
    setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/events-clients/" + id, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update record.");
      setRecords((current) => current.map((r) => r._id === id ? data.record : r));
      setNotice("Record updated.");
    } catch (err) { setError(err.message || "Could not update record."); }
  }

  async function deleteRecord(record) {
    if (!window.confirm("Delete the record for " + record.clientName + " — " + record.eventName + "? This cannot be undone.")) return;
    setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/events-clients/" + record._id, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not delete record.");
      setRecords((current) => current.filter((r) => r._id !== record._id));
      setNotice("Record deleted.");
    } catch (err) { setError(err.message || "Could not delete record."); }
  }

  return (
    <main className="min-h-screen bg-[#1f1d1a] px-4 py-8 text-[#f5f0e8] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin" className="text-xs uppercase tracking-[0.16em] text-[#c9a45e] hover:text-white">← Admin Dashboard</Link>
        <header className="mt-7 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a45e]">Client management</p><h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">Events & Clients</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Keep event enquiries, client details, dates, budgets, venues and progress together.</p></div>
          <div className="border border-white/15 px-4 py-3"><p className="text-[10px] uppercase tracking-[0.14em] text-white/45">Records</p><p className="mt-1 text-2xl">{records.length}</p></div>
        </header>

        {(error || notice) && <p role="status" className={"mt-5 border px-4 py-3 text-sm " + (error ? "border-red-400/30 text-red-200" : "border-emerald-400/30 text-emerald-200")}>{error || notice}</p>}

        <section className="mt-8 border border-white/15 bg-white/[0.025] p-5 sm:p-7">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a45e]">New record</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">Add a client or event</h2>
          <form onSubmit={createRecord} className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-xs text-white/65">Client name *<input required maxLength={120} value={form.clientName} onChange={(e) => change("clientName", e.target.value)} className={inputClass + " mt-2"} /></label>
            <label className="text-xs text-white/65">Event name *<input required maxLength={160} value={form.eventName} onChange={(e) => change("eventName", e.target.value)} className={inputClass + " mt-2"} placeholder="e.g. Ayesha & Hamza Wedding" /></label>
            <label className="text-xs text-white/65">Event type *<select required value={form.eventType} onChange={(e) => change("eventType", e.target.value)} className={inputClass + " mt-2"}>{["Wedding", "Engagement", "Birthday", "Baby shower", "Corporate", "Anniversary", "Other"].map((x) => <option key={x}>{x}</option>)}</select></label>
            <label className="text-xs text-white/65">Email<input type="email" maxLength={254} value={form.clientEmail} onChange={(e) => change("clientEmail", e.target.value)} className={inputClass + " mt-2"} /></label>
            <label className="text-xs text-white/65">Phone<input maxLength={40} value={form.clientPhone} onChange={(e) => change("clientPhone", e.target.value)} className={inputClass + " mt-2"} /></label>
            <label className="text-xs text-white/65">Event date<input type="date" value={form.eventDate} onChange={(e) => change("eventDate", e.target.value)} className={inputClass + " mt-2"} /></label>
            <label className="text-xs text-white/65">Venue / location<input maxLength={240} value={form.venue} onChange={(e) => change("venue", e.target.value)} className={inputClass + " mt-2"} /></label>
            <label className="text-xs text-white/65">Budget (number)<input type="number" min="0" step="any" value={form.budget} onChange={(e) => change("budget", e.target.value)} className={inputClass + " mt-2"} /></label>
            <label className="text-xs text-white/65">Status<select value={form.status} onChange={(e) => change("status", e.target.value)} className={inputClass + " mt-2"}>{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className="text-xs text-white/65 sm:col-span-2 lg:col-span-3">Notes<textarea maxLength={3000} rows={3} value={form.notes} onChange={(e) => change("notes", e.target.value)} className={inputClass + " mt-2"} placeholder="Requirements, preferences, follow-up notes..." /></label>
            <div className="sm:col-span-2 lg:col-span-3"><button disabled={saving} className="bg-[#c9a45e] px-6 py-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#211d19] transition hover:bg-white disabled:opacity-50">{saving ? "Saving…" : "Save record"}</button></div>
          </form>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a45e]">Workspace</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">Your records</h2></div><input aria-label="Search records" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients, events, venues…" className={inputClass + " max-w-sm"} /></div>
          {loading ? <p className="py-12 text-sm text-white/50">Loading records…</p> : filtered.length === 0 ? <p className="mt-4 border border-white/10 p-8 text-sm text-white/50">{records.length ? "No records match your search." : "No event records yet. Add your first one above."}</p> : <div className="mt-4 grid gap-4 md:grid-cols-2">
            {filtered.map((record) => <article key={record._id} className="border border-white/15 bg-white/[0.025] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] uppercase tracking-[0.14em] text-[#c9a45e]">{record.eventType}</p><h3 className="mt-1 font-[family-name:var(--font-display)] text-xl">{record.eventName}</h3><p className="mt-1 text-sm text-white/65">{record.clientName}</p></div><select aria-label={"Status for " + record.eventName} value={record.status} onChange={(e) => updateRecord(record._id, { status: e.target.value })} className="border border-white/15 bg-[#211f1c] px-2 py-2 text-xs">{statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
              <div className="mt-4 grid gap-2 text-xs text-white/55 sm:grid-cols-2"><p>📅 {formatDate(record.eventDate)}</p><p>📍 {record.venue || "Venue not set"}</p><p>✉ {record.clientEmail || "No email"}</p><p>☎ {record.clientPhone || "No phone"}</p>{record.budget != null && <p>Budget: {Number(record.budget).toLocaleString()}</p>}</div>
              {record.notes && <p className="mt-4 border-t border-white/10 pt-3 text-sm leading-6 text-white/65">{record.notes}</p>}
              <div className="mt-4 flex justify-end border-t border-white/10 pt-3"><button onClick={() => deleteRecord(record)} className="text-xs uppercase tracking-[0.12em] text-red-300/80 hover:text-red-200">Delete record</button></div>
            </article>)}
          </div>}
        </section>
      </div>
    </main>
  );
}
