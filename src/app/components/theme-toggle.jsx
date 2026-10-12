"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("sterling-bloom-theme");
    const initialDark = saved === "dark";
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
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="sb-theme-toggle"
    >
      <span aria-hidden="true">{dark ? "☼" : "◐"}</span>
      <span>{dark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
