"use client";

import { useEffect, useState } from "react";
import { isCalendlyUrl, openCalendly } from "../../lib/calendly-popup";

const CALENDLY_URL = "https://calendly.com/murtazasiddiqui250/30min";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("sterling-bloom-theme");
    const initialDark = saved !== "light";
    setDark(initialDark);
    document.documentElement.dataset.theme = initialDark ? "dark" : "light";
    document.documentElement.style.colorScheme = initialDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    document.documentElement.style.colorScheme = nextDark ? "dark" : "light";
    window.localStorage.setItem("sterling-bloom-theme", nextDark ? "dark" : "light");
  }

  return (
    <div className="sb-floating-actions" aria-label="Display and booking controls">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={dark}
        className="sb-theme-toggle"
      >
        <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {dark
            ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>
            : <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />}
        </svg>
      </button>
      {isCalendlyUrl(CALENDLY_URL) ? (
        <button type="button" onClick={openCalendly} className="sb-floating-book" aria-label="Book a meeting">
          Book a meeting
        </button>
      ) : (
        <a href={CALENDLY_URL} className="sb-floating-book">Book a meeting</a>
      )}
    </div>
  );
}
