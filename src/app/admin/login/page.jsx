"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to sign in.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1D1813] px-5 py-12">
      <div className="w-full max-w-md rounded-[24px] bg-[#F8F7F4] p-7 shadow-2xl sm:p-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#B68A35]">
          Sterling Bloom
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium text-[#211d19]">
          Admin Portal
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Private access for managing inquiries, events, and portfolio content.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500"
            >
              Admin Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 text-xs uppercase tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Enter Admin"}
          </button>
        </form>
      </div>
    </main>
  );
}
