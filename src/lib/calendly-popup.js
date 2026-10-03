export const CALENDLY_URL = "https://calendly.com/murtazasiddiqui250/30min";
const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

export function openCalendly(event) {
  event?.preventDefault?.();

  if (typeof window === "undefined") return;

  if (window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  const existing = document.querySelector('script[src="' + CALENDLY_SCRIPT + '"]');
  if (existing) {
    existing.addEventListener("load", () => {
      window.Calendly?.initPopupWidget?.({ url: CALENDLY_URL });
    }, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = CALENDLY_SCRIPT;
  script.async = true;
  script.onload = () => {
    window.Calendly?.initPopupWidget?.({ url: CALENDLY_URL });
  };
  document.head.appendChild(script);
}
