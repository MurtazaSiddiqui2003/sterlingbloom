"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./brand-logo";
import { isCalendlyUrl, openCalendly } from "../../lib/calendly-popup";

export default function Navbar({ content }) {
  const pathname = usePathname();
  const navLinks = content.links.map(([name, href]) => ({ name, href }));
  const consultationHref = content.ctaHref && content.ctaHref !== "#contact" ? content.ctaHref : "https://calendly.com/murtazasiddiqui250/30min";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return undefined;
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  const navClass = isScrolled
    ? "bg-[#F8F7F4]/96 text-[#6f5226] shadow-[0_8px_30px_rgba(29,24,19,0.08)] backdrop-blur-xl"
    : "bg-transparent text-white";

  return (
    <nav className={"fixed left-0 top-0 z-50 w-full transition-all duration-500 " + navClass}>
      <div className={"mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-10 " + (isScrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4")}>
        <Link href="/" aria-label="Sterling Bloom home" className="shrink-0">
          <BrandLogo priority className={"h-16 w-16 transition-all duration-500 sm:h-20 sm:w-20 " + (isScrolled ? "scale-[0.9]" : "")} />
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm transition-colors hover:text-[#D6B56D]">{link.name}</Link>
          ))}
          {isCalendlyUrl(consultationHref) ? (
            <button type="button" onClick={openCalendly} className="btn-primary ml-2 px-5 py-2.5">
              {content.cta}
            </button>
          ) : (
            <a href={consultationHref} className="btn-primary ml-2 px-5 py-2.5">{content.cta}</a>
          )}
        </div>

        <button
          className="group relative flex h-11 w-11 items-center justify-center rounded-[2px] border border-current/30 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <span className="relative block h-5 w-5" aria-hidden="true">
            <span className={"absolute left-0 top-1 h-px w-5 origin-center bg-current transition-transform duration-300 ease-out " + (isOpen ? "translate-y-1.5 rotate-45" : "")} />
            <span className={"absolute left-0 top-2.5 h-px w-5 bg-current transition-all duration-200 ease-out " + (isOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100")} />
            <span className={"absolute left-0 top-4 h-px w-5 origin-center bg-current transition-transform duration-300 ease-out " + (isOpen ? "-translate-y-1.5 -rotate-45" : "")} />
          </span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={"overflow-hidden border-t border-black/5 bg-[#F8F7F4] px-5 text-[#6f5226] shadow-lg transition-all duration-300 ease-out md:hidden " + (isOpen ? "max-h-[420px] pb-6 pt-4 opacity-100" : "max-h-0 pb-0 pt-0 opacity-0")}
      >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm">{link.name}</Link>
            ))}
            {isCalendlyUrl(consultationHref) ? (
              <button type="button" onClick={() => { setIsOpen(false); openCalendly(); }} className="btn-primary mt-1 w-full">
                {content.cta}
              </button>
            ) : (
              <a href={consultationHref} onClick={() => setIsOpen(false)} className="btn-primary mt-1 w-full">{content.cta}</a>
            )}
          </div>
      </div>
    </nav>
  );
}
