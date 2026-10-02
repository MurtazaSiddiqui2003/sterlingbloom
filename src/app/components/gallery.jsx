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
              type="button"
              onClick={() => setActiveCategory(category.value)}
              aria-pressed={activeCategory === category.value}
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
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {filteredGallery.map((item, index) => (
            <article
              key={item.id}
              className={
                "group relative overflow-hidden rounded-[20px] bg-white " +
                (index === 0 ? "sm:row-span-2" : "")
              }
            >
              <div
                className={
                  "relative overflow-hidden " +
                  (index === 0 ? "aspect-[4/5] h-full" : "aspect-[4/3]")
                }
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-xs">
                    {item.category}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-medium leading-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <p className="mx-auto mb-5 max-w-md text-sm leading-6 text-gray-500">
            More celebrations, details, and event stories coming soon.
          </p>
          <a href="#contact" className="btn-primary">
            View More Work
          </a>
        </div>
      </div>
    </section>
  );
}
