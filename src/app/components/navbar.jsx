"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar({ content }) {
  const pathname = usePathname();
  const navLinks = content.links.map(([name, href]) => ({ name, href }));

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    if (pathname?.startsWith("/admin")) return null;

  return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <nav
      className={
        "fixed top-0 z-50 w-full transition-all duration-300 " +
        (isScrolled
          ? "bg-[#F8F7F4]/95 text-[#6f5226] shadow-sm backdrop-blur-md"
          : "bg-[#1D1813]/20 text-white backdrop-blur-[2px]")
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-wide sm:text-3xl"
        >
          {content.brand}
        </Link>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm transition-colors hover:text-[#D6B56D]"
            >
              {link.name}
            </Link>
          ))}
          <Link href={content.ctaHref || "#contact"} className="btn-primary ml-2 px-5 py-2.5">
            {content.cta}
          </Link>
        </div>

        <button
          className="rounded-full border border-current/30 px-3 py-1.5 text-lg md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-black/5 bg-[#F8F7F4] px-5 pb-6 pt-4 text-[#6f5226] shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={content.ctaHref || "#contact"}
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-1 w-full"
            >
              {content.cta}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
