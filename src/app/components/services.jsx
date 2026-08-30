"use client";

import { useState } from "react";
import services from "./constants/services";

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center">
          <p className="eyebrow inline-flex">OUR SERVICES</p>

          <div className="mx-auto mt-5 mb-8 h-px w-20 bg-[#B68A35]" />

          <h2
            className="
            text-5xl
            lg:text-6xl
            font-light
            leading-tight
            tracking-tight
        "
          >
            Designed For Every Occasion
          </h2>
        </div>
        <div
          className="
        mt-10
        flex
        justify-center
        gap-10
        flex-wrap
    "
        >
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveService(index)}
              className={`
    relative
    pb-3
    text-lg
    transition-all
    duration-300
    ${
      activeService === index
        ? "text-[#B68A35] font-medium"
        : "text-gray-500 hover:text-black"
    }
`}
            >
              {service.title}
              <span
                className={`
        absolute
        left-0
        -bottom-0.5
        h-[2px]
        bg-[#B68A35]
        transition-all
        duration-300

        ${activeService === index ? "w-full" : "w-0"}
    `}
              />
            </button>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
            <img
              src={services[activeService].image}
              alt={services[activeService].title}
              className="
            h-[600px]
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
        "
            />
          </div>
          <div>
            <p className="eyebrow mb-5">Featured Service</p>

            <div className="mb-8 h-px w-20 bg-[#B68A35]" />

            <h3
              className="
            text-5xl
            font-light
            leading-tight
            tracking-tight
        "
            >
              {services[activeService].title}
            </h3>

            <p
              className="
            mt-8
            max-w-xl
            text-lg
            leading-8
            text-gray-600
        "
            >
              {services[activeService].description}
            </p>
            <div className="mt-10">
              <button
                className="
            rounded-full
            bg-[#B68A35]
            px-8
            py-4
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
        "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
