export const CALENDLY_URL = "https://calendly.com/murtazasiddiqui250/30min";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

let calendlyPromise = null;

function loadCalendly() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Calendly?.initPopupWidget) return Promise.resolve(window.Calendly);

  if (calendlyPromise) return calendlyPromise;

  calendlyPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src="' + CALENDLY_SCRIPT + '"]');

    if (existing) {
      existing.addEventListener(
        "load",
        () => resolve(window.Calendly || null),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    script.onload = () => resolve(window.Calendly || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });

  return calendlyPromise;
}

export async function openCalendly(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (typeof window === "undefined") return false;

  const Calendly = await loadCalendly();

  if (Calendly?.initPopupWidget) {
    Calendly.initPopupWidget({ url: CALENDLY_URL });
    return false;
  }

  return false;
}

export function isCalendlyUrl(value = "") {
  return String(value).toLowerCase().includes("calendly.com");
}
