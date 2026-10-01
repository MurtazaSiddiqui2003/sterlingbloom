"use client";

import { useState } from "react";
import gallery from "./constants/gallery";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGallery =
    activeCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const categories = [
    { label: "All", value: "all" },
    { label: "Weddings", value: "weddings" },
    { label: "Nikah", value: "nikah" },
    { label: "Mehndi", value: "mehndi" },
    { label: "Corporate", value: "corporate" },
  ];

  return (
    <section id="portfolio" className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">FEATURED WORK</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-4xl">
            A Glimpse of Our Creations
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            A selection of celebrations shaped through thoughtful styling,
            considered details, and a distinct sense of place.
          </p>
        </div>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-2 sm:mt-12 sm:justify-center sm:gap-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={
                "relative shrink-0 pb-3 text-sm transition-all duration-300 sm:text-base " +
                (activeCategory === category.value
                  ? "font-medium text-[#B68A35]"
                  : "text-gray-500 hover:text-[#211d19]")
              }
            >
              {category.label}
              <span
                className={
                  "absolute bottom-0 left-0 h-px bg-[#B68A35] transition-all duration-300 " +
                  (activeCategory === category.value ? "w-full" : "w-0")
                }
              />
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-[18px] bg-white"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-black/0 p-5 transition-all duration-500 group-hover:bg-black/45 sm:p-6">
                <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/75 sm:text-xs">
                    {item.category}
                  </p>
                  <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-2xl font-medium text-white sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a href="#contact" className="btn-primary">
            View More Work
          </a>
        </div>
      </div>
    </section>
  );
}
