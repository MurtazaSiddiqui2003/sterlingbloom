"use client";

import { useEffect, useState } from "react";

export default function Gallery({ content }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredGallery =
    activeCategory === "all"
      ? content.items
      : content.items.filter((item) => item.category === activeCategory);

  const categories = content.categories.map(([label, value]) => ({ label, value }));

  useEffect(() => setVisibleCount(5), [activeCategory]);

  const visibleGallery = filteredGallery.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGallery.length;

  return (
    <section data-reveal id="portfolio" className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-4xl">
            {content.heading}
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

        {/* Missing grid wrapper restored below */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleGallery.map((item, index) => (
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
            {content.note}
          </p>
          <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + 4, filteredGallery.length))} className="btn-primary">
            {hasMore ? content.button : "All Work Shown"}
          </button>
        </div>
      </div>
    </section>
  );
}
