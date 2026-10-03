"use client";

import { usePathname } from "next/navigation";
import BrandLogo from "./brand-logo";

function Icon({ type }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9.3c0-.8.3-1.3 1-1.3Z" fill="currentColor" stroke="none" />,
    phone: <path d="M7.2 3.8 5.1 5.9c-.8.8-.9 2-.3 3 2.6 4.3 6.2 7.9 10.5 10.5 1 .6 2.2.5 3-.3l2.1-2.1-3.2-3.2-2.2 1.4a17 17 0 0 1-5.7-5.7l1.4-2.2-3.5-3.5Z" />,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    pin: <><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">{paths[type]}</svg>;
}

export default function Footer({ content, contact }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const explore = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Portfolio", "#portfolio"],
    ["Our Process", "#process"],
    ["Packages", "#packages"],
    ["Testimonials", "#testimonials"],
  ];

  const phoneHref = `tel:${String(contact.phone || "").replace(/[^+\\d]/g, "")}`;
  const emailHref = `mailto:${contact.email || ""}`;

  return (
    <footer className="bg-[#1D1813] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-end lg:justify-between lg:py-16">
          <div className="max-w-2xl">
            <BrandLogo priority className="h-16 w-16 object-contain sm:h-[72px] sm:w-[72px]" />
            <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.28em] text-[#D6B56D]">{content.eyebrow}</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              {content.heading}
              <br />
              <span className="text-[#D6B56D]">{content.highlight}</span>
            </h2>
          </div>
          <a href={content.buttonHref || "#contact"} className="inline-flex w-fit items-center rounded-[2px] border border-[#D6B56D]/70 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#D6B56D] transition-all duration-300 hover:bg-[#D6B56D] hover:text-[#1D1813]">
            {content.button}
          </a>
        </div>

        <div className="grid gap-12 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo className="h-14 w-14 object-contain" />
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">{content.description}</p>
            <div className="mt-7 flex items-center gap-3">
              {content.instagramHref ? (
                <a href={content.instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition hover:border-[#D6B56D] hover:text-[#D6B56D]"><Icon type="instagram" /></a>
              ) : null}
              {content.facebookHref ? (
                <a href={content.facebookHref} target="_blank" rel="noreferrer" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition hover:border-[#D6B56D] hover:text-[#D6B56D]"><Icon type="facebook" /></a>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D6B56D]">{content.exploreLabel || "Explore"}</h3>
            <ul className="mt-6 space-y-3.5">
              {explore.map(([label, href]) => (
                <li key={label}><a href={href} className="text-sm text-white/55 transition hover:text-white">{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D6B56D]">{content.contactLabel}</h3>
            <div className="mt-6 space-y-4 text-sm text-white/55">
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location || "")}`} target="_blank" rel="noreferrer" className="flex items-start gap-3 transition hover:text-[#D6B56D]"><Icon type="pin" /><span>{contact.location}</span></a>
              <a href={phoneHref} className="flex items-center gap-3 transition hover:text-[#D6B56D]"><Icon type="phone" /><span>{contact.phone}</span></a>
              <a href={emailHref} className="flex items-center gap-3 transition hover:text-[#D6B56D]"><Icon type="email" /><span>{contact.email}</span></a>
            </div>
            <a href={content.buttonHref || "#contact"} className="mt-6 inline-flex rounded-[2px] border border-white/20 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 transition hover:border-[#D6B56D] hover:text-[#D6B56D]">{content.button}</a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[10px] uppercase tracking-[0.12em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {content.copyrightName}. All rights reserved.</p>
          <p>{content.closing}</p>
        </div>
      </div>
    </footer>
  );
}
