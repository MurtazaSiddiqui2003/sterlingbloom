export const CALENDLY_URL = "https://calendly.com/murtazasiddiqui250/30min";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

let calendlyPromise = null;

function waitForCalendly(timeout = 8000) {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Calendly?.initPopupWidget) return Promise.resolve(window.Calendly);
  if (calendlyPromise) return calendlyPromise;

  calendlyPromise = new Promise((resolve) => {
    const startedAt = Date.now();
    let settled = false;

    const finish = (value) => {
      if (settled) return;
      settled = true;
      window.clearInterval(interval);
      window.clearTimeout(timer);
      resolve(value);
    };

    const check = () => {
      if (window.Calendly?.initPopupWidget) {
        finish(window.Calendly);
      } else if (Date.now() - startedAt >= timeout) {
        finish(null);
      }
    };

    const interval = window.setInterval(check, 50);
    const timer = window.setTimeout(() => finish(window.Calendly || null), timeout + 100);

    const existing = document.querySelector('script[src="' + CALENDLY_SCRIPT + '"]');

    if (!existing) {
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT;
      script.async = true;
      script.onload = check;
      script.onerror = () => finish(null);
      document.head.appendChild(script);
    }

    check();
  });

  return calendlyPromise;
}

export async function openCalendly(event) {
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if (typeof window === "undefined") return false;

  const Calendly = await waitForCalendly();

  if (Calendly?.initPopupWidget) {
    Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    // If an extension/network policy blocks Calendly's widget script,
    // keep the user on the site and provide a direct booking window.
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }

  return false;
}

export function isCalendlyUrl(value = "") {
  return String(value).toLowerCase().includes("calendly.com");
}
