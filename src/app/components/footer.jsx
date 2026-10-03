"use client";

import { usePathname } from "next/navigation";

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

  return (
    <footer className="bg-[#1D1813] text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-end lg:justify-between lg:py-16">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D6B56D]">{content.eyebrow}</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              {content.heading}
              <br />
              <span className="text-[#D6B56D]">{content.highlight}</span>
            </h2>
          </div>
          <a href={content.buttonHref || "#contact"} className="inline-flex w-fit items-center rounded-[10px] border border-[#D6B56D]/70 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#D6B56D] transition-all duration-300 hover:bg-[#D6B56D] hover:text-[#1D1813]">
            Start a conversation
          </a>
        </div>

        <div className="grid gap-12 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-medium">{content.eyebrow}</h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">{content.description}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
              <span>{content.instagram}</span>
              <span>{content.facebook}</span>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D6B56D]">Explore</h3>
            <ul className="mt-6 space-y-3.5">
              {explore.map(([label, href]) => (
                <li key={label}><a href={href} className="text-sm text-white/55 transition hover:text-white">{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D6B56D]">{content.contactLabel}</h3>
            <div className="mt-6 space-y-3.5 text-sm text-white/55">
              <p>{contact.location}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
            <a href={content.buttonHref || "#contact"} className="mt-6 inline-flex rounded-[10px] border border-white/20 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 transition hover:border-[#D6B56D] hover:text-[#D6B56D]">{content.button}</a>
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
