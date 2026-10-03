"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Services({ content }) {
  const [activeService, setActiveService] = useState(0);
  const active = content.items[activeService] || content.items[0];
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const numberRef = useRef(null);
  const transitionRef = useRef(null);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!stageRef.current || prefersReducedMotion()) return;

    gsap.set([imageRef.current, contentRef.current], {
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.985,
    });

    gsap.to([imageRef.current, contentRef.current], {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.06,
    });

    gsap.fromTo(
      numberRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.65, delay: 0.12, ease: "power2.out" },
    );

    return () => {
      gsap.killTweensOf([imageRef.current, contentRef.current, numberRef.current]);
    };
  }, [activeService]);

  const selectService = (index) => {
    if (index === activeService) return;

    if (prefersReducedMotion()) {
      setActiveService(index);
      return;
    }

    transitionRef.current?.kill();

    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => setActiveService(index),
    });

    transitionRef.current = timeline;

    // Soft dissolve: no horizontal slide or clip-path wipe.
    timeline
      .to(imageRef.current, {
        opacity: 0,
        filter: "blur(5px)",
        scale: 1.018,
        duration: 0.42,
      })
      .to(
        contentRef.current,
        {
          opacity: 0,
          filter: "blur(4px)",
          scale: 0.99,
          duration: 0.36,
        },
        "<0.02",
      );
  };

  return (
    <section data-reveal id="services" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-3xl">{content.heading}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">{content.description}</p>
        </div>

        <div className="mt-10 flex justify-center gap-2 overflow-x-auto pb-2 sm:mt-12 sm:gap-8">
          {content.items.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onClick={() => selectService(index)}
              aria-pressed={activeService === index}
              className={"relative shrink-0 px-3 pb-3 text-sm font-medium transition-colors duration-300 sm:text-base " + (activeService === index ? "text-[#B68A35]" : "text-gray-500 hover:text-[#211d19]")}
            >
              {service.title}
              <span
                className={"absolute bottom-0 left-3 h-px bg-[#B68A35] transition-all duration-500 " + (activeService === index ? "right-3" : "right-full")}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <div ref={stageRef} className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14">
          <div ref={imageRef} className="relative overflow-hidden rounded-[2px] bg-[#F8F7F4] shadow-xl shadow-black/10">
            <img src={active.image} alt={active.title} className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[600px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 border border-white/30 bg-black/20 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm sm:bottom-6 sm:left-6">
              {String(activeService + 1).padStart(2, "0")} / {String(content.items.length).padStart(2, "0")}
            </div>
          </div>

          <div ref={contentRef} className="lg:pl-2">
            <p className="eyebrow mb-5">{content.featuredLabel}</p>
            <div className="mb-7 h-px w-16 bg-[#B68A35]" />
            <div className="flex items-end justify-between gap-5">
              <h3 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-tight tracking-[-0.02em] text-[#211d19] sm:text-5xl">
                {active.title}
              </h3>
              <span ref={numberRef} className="hidden shrink-0 pb-1 font-[family-name:var(--font-display)] text-4xl font-light text-[#D6B56D]/60 lg:block">
                {String(activeService + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8">{active.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="#contact" className="btn-primary">{content.button}</Link>
              <span className="text-xs uppercase tracking-[0.18em] text-gray-400">{content.note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
