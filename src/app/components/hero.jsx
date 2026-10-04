"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { isCalendlyUrl, openCalendly } from "../../lib/calendly-popup";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Hero({ content }) {
  const heroRef = useRef(null);
  const primaryHref = content.primaryButtonHref && content.primaryButtonHref !== "#contact" ? content.primaryButtonHref : "https://calendly.com/murtazasiddiqui250/30min";
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  const eyebrowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(videoRef.current, { scale: 1.12 }, { scale: 1, duration: 2.5 })
        .from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.8")
        .from(titleRef.current, { opacity: 0, y: 60, duration: 1 }, "-=0.6")
        .from(textRef.current, { opacity: 0, y: 25, duration: 0.8 }, "-=0.5")
        .from(buttonsRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(scrollRef.current, { opacity: 0, y: 15, duration: 0.5 }, "-=0.2");
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100svh] overflow-hidden lg:min-h-screen"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={content.backgroundImage}
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={content.video} type="video/mp4" />
        <source src="/videos/hero.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 z-10 bg-black/45" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />

      <div className="relative z-10 flex min-h-[100svh] items-start px-5 pb-20 pt-[6.75rem] sm:items-center sm:px-8 sm:pt-20 lg:min-h-screen lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <p ref={eyebrowRef} className="eyebrow border-white/40 text-white">
              {content.eyebrow}
            </p>

            <h1
              ref={titleRef}
              className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-[3.25rem] font-medium leading-[0.94] tracking-[-0.025em] sm:text-6xl text-white sm:text-6xl lg:text-8xl"
            >
              {content.before}{" "}
              <span className="special-text">{content.highlight}</span>
              {content.after}
            </h1>

            <p
              ref={textRef}
              className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl"
            >
              {content.description}
            </p>

            <div ref={buttonsRef} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              {isCalendlyUrl(primaryHref) ? (
                <button type="button" onClick={openCalendly} className="btn-primary">
                  {content.primaryButton}
                </button>
              ) : (
                <Link href={primaryHref} className="btn-primary">
                  {content.primaryButton}
                </Link>
              )}
              <Link href={content.secondaryButtonHref || "#portfolio"} className="btn-ghost">
                {content.secondaryButton}
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={
            "absolute bottom-7 left-1/2 hidden -translate-x-1/2 transition-opacity sm:block " +
            (isScrolled ? "opacity-0" : "opacity-100")
          }
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
            Scroll to explore ↓
          </span>
        </div>
      </div>
    </section>
  );
}
