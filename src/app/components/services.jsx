"use client";

import { useState } from "react";
import services from "./constants/services";

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">OUR SERVICES</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-3xl">
            Designed For Every Occasion
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Thoughtful design, refined styling, and seamless execution for
            celebrations that feel distinctly yours.
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-2 overflow-x-auto pb-2 sm:mt-12 sm:gap-8">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveService(index)}
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
              />
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="group relative overflow-hidden rounded-[28px] bg-[#F8F7F4] shadow-xl shadow-black/10">
            <img
              src={services[activeService].image}
              alt={services[activeService].title}
              className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:h-[520px] lg:h-[600px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          <div className="lg:pl-2">
            <p className="eyebrow mb-5">FEATURED SERVICE</p>
            <div className="mb-7 h-px w-16 bg-[#B68A35]" />
            <h3 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-tight tracking-[-0.02em] text-[#211d19] sm:text-5xl">
              {services[activeService].title}
            </h3>
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-8">
              {services[activeService].description}
            </p>
            <div className="mt-8">
              <button className="btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
