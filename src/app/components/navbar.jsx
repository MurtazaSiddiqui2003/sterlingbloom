"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  
  const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "Packages", href: "#packages" },
  { name: "Testimonials", href: "#testimonials" },
];

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change background after scrolling down more than 10 pixels
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white text-yellow-700 md:bg-transparent md:text-white fixed top-0 w-full z-20 text-white transition-all ${isScrolled ? "md:bg-white md:text-yellow-700" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">Sterling Bloom</Link>
        </h1>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-8">
          <Link href="#contact" className="btn-primary">
            Book Consultation
          </Link>
        </div>

        <button
  className="block md:hidden"
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle navigation menu"
  aria-expanded={isOpen}
>
  {isOpen ? "✖" : "☰"}
</button>
      </div>

      {/* <div
        className={`hidden md:block absolute inset-0 border-8 border-transparent ${
          !isScrolled
            ? "[border-image:url('/images/border.png')_30_stretch] [border-image-inset:-8px]"
            : "hidden"
        }`}
      ></div> */}

      {isOpen && (
        <div className=" flex flex-col gap-4 px-6 pb-6 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
