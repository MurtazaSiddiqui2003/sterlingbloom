"use client";

import { useState } from "react";
import gallery from "./constants/gallery";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGallery =
    activeCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="bg-[#F8F7F4] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center">
          <p className="eyebrow inline-flex">FEATURED WORK</p>

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
            A Glimpse of Our Creations
          </h2>
        </div>

        {/* Category Filters */}
        <div className="mt-12 flex justify-center gap-8 flex-wrap">
          {[
            { label: "All", value: "all" },
            { label: "Weddings", value: "weddings" },
            { label: "Nikah", value: "nikah" },
            { label: "Mehndi", value: "mehndi" },
            { label: "Corporate", value: "corporate" },
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`
                relative
                pb-3
                text-lg
                transition-all
                duration-300
                ${
                  activeCategory === category.value
                    ? "font-medium text-[#B68A35]"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              {category.label}

              <span
                className={`
                  absolute
                  left-0
                  -bottom-0.5
                  h-[2px]
                  bg-[#B68A35]
                  transition-all
                  duration-300
                  ${activeCategory === category.value ? "w-full" : "w-0"}
                `}
              />
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-16 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
              />

              {/* Overlay */}
              <div
                className="
          absolute
          inset-0
          flex
          items-end
          bg-black/0
          p-6
          transition-all
          duration-500
          group-hover:bg-black/45
        "
              >
                <div
                  className="
            translate-y-4
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-light text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button
            className="
      border
      border-[#B68A35]
      px-8
      py-3
      text-sm
      uppercase
      tracking-[0.15em]
      text-[#B68A35]
      transition-all
      duration-300
      hover:bg-[#B68A35]
      hover:text-white
    "
          >
            View More Work
          </button>
        </div>
      </div>
    </section>
  );
}
