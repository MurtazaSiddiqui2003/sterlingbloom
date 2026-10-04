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

  return (
    <nav className="fixed top-0 z-50 w-full transparent text-[#6f5226] shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" aria-label="Sterling Bloom home">
          <BrandLogo priority className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
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

        <button className="rounded-[2px] border border-current/30 px-3 py-1.5 text-lg md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu" aria-expanded={isOpen} aria-controls="mobile-navigation">
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-black/5 bg-[#F8F7F4] px-5 pb-6 pt-4 text-[#6f5226] shadow-lg md:hidden">
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
      )}
    </nav>
  );
}
