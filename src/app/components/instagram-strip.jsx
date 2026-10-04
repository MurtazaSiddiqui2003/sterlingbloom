"use client";

import Link from "next/link";

export default function InstagramStrip({ content }) {
  const items = (content?.items || []).filter((item) => item?.image).slice(0, 6);
  if (!items.length) return null;

  const profileUrl = content?.url?.trim();

  return (
    <section data-reveal id="instagram" className="bg-[#F8F7F4] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-[#211d19]/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{content?.eyebrow || "FOLLOW ALONG"}</p>
            <h2 className="section-heading mt-4 max-w-2xl">{content?.heading}</h2>
            <p className="section-copy mt-4 max-w-xl">{content?.description}</p>
          </div>
          {profileUrl ? (
            <Link href={profileUrl} target="_blank" rel="noreferrer" className="btn-ghost w-fit">
              {content?.button || "Follow on Instagram"}
            </Link>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <a
              key={item.image + "-" + index}
              href={profileUrl || "#instagram"}
              target={profileUrl ? "_blank" : undefined}
              rel={profileUrl ? "noreferrer" : undefined}
              onClick={!profileUrl ? (event) => event.preventDefault() : undefined}
              className="group relative aspect-square overflow-hidden bg-[#EAE7E1]"
              aria-label={profileUrl ? (item.alt || "Instagram post") + " — open Instagram" : item.alt || "Instagram image"}
            >
              <img
                src={item.image}
                alt={item.alt || ""}
                loading={index < 3 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[#211d19]/45">
          <span>{content?.handle || "Instagram"}</span>
          {profileUrl ? <span>View more on Instagram ↗</span> : <span>Add the Instagram URL in Admin → Website Content</span>}
        </div>
      </div>
    </section>
  );
}