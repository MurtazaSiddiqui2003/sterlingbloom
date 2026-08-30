"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import heroContent from "./constants/hero";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const eyebrowRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        videoRef.current,
        {
          scale: 1.15,
        },
        {
          scale: 1,
          duration: 2.5,
        },
      )

        .from(
          eyebrowRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.8",
        )

        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 80,
            duration: 1,
          },
          "-=2",
        )
        .from(
          textRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5",
        )

        .from(
          buttonsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3",
        )

        .from(
          scrollRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          "-=0.2",
        );
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 min-h-full w-full object-cover z-0"
      >
        <source src="/videos/hero.mp4" type="video/mp4" className="z-0" />
        <source src="/videos/hero.webm" type="video/webm" className="z-0" />
      </video>
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative max-w-3xl md:max-w-4xl z-10 flex flex-col justify-center items-left min-h-screen text-white text-center md:text-left px-4">
        <div className="max-w-7xl mx-auto w-full px-6 ">
          <p ref={eyebrowRef} className="ml-8 mt-5 eyebrow inline-block w-fit">
            {heroContent.eyebrow}
          </p>
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-7xl px-5 py-4 font-light leading-tight tracking-tight"
          >
            {heroContent.title.before}
            <span className="special-text">{heroContent.title.highlight}</span>
            {heroContent.title.after}
          </h1>
          <p ref={textRef} className="text-xl px-8 py-4">
            {heroContent.description}
          </p>
          <div
            ref={buttonsRef}
            className=" flex-col px-8 py-5 flex md:flex-row gap-2"
          >
            <Link href="#contact" className="btn-primary">
              {heroContent.primaryButton}
            </Link>
            <Link href="#portfolio" className="btn-ghost">
              {heroContent.secondaryButton}
            </Link>
          </div>
        </div>
        <div
          ref={scrollRef}
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 ${isScrolled ? "hidden" : "visible"}`}
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="mb-2 text-xs tracking-[0.3em] uppercase animate-bounce">
              Scroll Down ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
