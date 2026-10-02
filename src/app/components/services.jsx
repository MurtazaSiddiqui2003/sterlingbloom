"use client";

import { useState } from "react";
import Link from "next/link";

export default function Services({ content }) {
  const [activeService, setActiveService] = useState(0);
  const active = content.items[activeService] || content.items[0];

  return (
    <section data-reveal id="services" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-3xl">
            {content.heading}
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Thoughtful design, refined styling, and seamless execution for
            celebrations that feel distinctly yours.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-2 overflow-x-auto pb-2 sm:mt-12 sm:gap-8">
          {content.items.map((service, index) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setActiveService(index)}
              aria-pressed={activeService === index}
              className={
                "relative shrink-0 px-3 pb-3 text-sm font-medium transition-all duration-300 sm:text-base " +
                (activeService === index
                  ? "text-[#B68A35]"
                  : "text-gray-500 hover:text-[#211d19]")
              }
            >
              {service.title}
              <span
                className={
                  "absolute bottom-0 left-3 h-px bg-[#B68A35] transition-all duration-300 " +
                  (activeService === index ? "right-3" : "right-full")
                }
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        
          <div className="relative overflow-hidden rounded-[28px] bg-[#F8F7F4] shadow-xl shadow-black/10">
            <img
              src={active.image}
              alt={active.title}
              className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[600px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm sm:bottom-6 sm:left-6">
              {String(activeService + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </div>
          </div>

          <div className="lg:pl-2">
            <p className="eyebrow mb-5">{content.featuredLabel}</p>
            <div className="mb-7 h-px w-16 bg-[#B68A35]" />

            <div className="flex items-end justify-between gap-5">
              <h3 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-tight tracking-[-0.02em] text-[#211d19] sm:text-5xl">
                {active.title}
              </h3>
              <span className="hidden shrink-0 pb-1 font-[family-name:var(--font-display)] text-4xl font-light text-[#D6B56D]/60 lg:block">
                {String(activeService + 1).padStart(2, "0")}
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8">
              {active.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="#contact" className="btn-primary">
                {content.button}
              </Link>
              <span className="text-xs uppercase tracking-[0.18em] text-gray-400">
                {content.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
