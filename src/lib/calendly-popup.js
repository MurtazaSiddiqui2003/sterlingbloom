export const CALENDLY_URL = "https://calendly.com/murtazasiddiqui250/30min";

export function openCalendly(event) {
  event?.preventDefault?.();

  if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }

  if (typeof window !== "undefined") {
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }
}
