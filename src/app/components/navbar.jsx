"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent shadow-md fixed top-0 w-screen z-20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <a href="#top">Sterling Bloom</a>
        </h1>
        <div className="hidden md:flex gap-8">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#packages">Packages</a>
          <a href="reviews">Reviews</a>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#contact" className="px-4 py-2 bg-yellow-600 dotted">Book Consultation</a>
        </div>
        
      </div>
    </nav>
  );
}
