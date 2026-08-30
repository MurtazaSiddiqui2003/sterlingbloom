import Image from "next/image";
import Link from "next/link";
import aboutContent from "./constants/about";

export default function About() {
  return (
    <section id="about" className="bg-[#F8F7F4] py-24">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ================= Image ================= */}
          <div>
            <div
              className="group
    relative
    h-[600px]
    lg:h-[760px]
    overflow-hidden
    rounded-[32px]
    shadow-2xl
    ring-1
    ring-black/5
  "
            >
              <Image
                src="/images/about.jpg"
                alt="Luxury wedding decor by Sterling Bloom"
                fill
                className="
  object-cover
  transition-transform
  duration-700
  group-hover:scale-105
"
                priority={false}
              />
            </div>
          </div>

          {/* ================= Content ================= */}
          <div className="lg:pt-12">
            {/* Eyebrow */}
            <p className="eyebrow">{aboutContent.eyebrow}</p>
            <div className="mt-5 mb-8 h-px w-20 bg-[#C9A96E]" />
            {/* Heading */}
            <h2
              className="
text-5xl
lg:text-6xl
font-light
leading-[1.1]
tracking-tight
text-gray-900
max-w-xl
"
            >
              {aboutContent.title.before}{" "}
              <span className="text-[#B68A35]">
                {aboutContent.title.highlight}
              </span>{" "}
              {aboutContent.title.after}
            </h2>

            {/* Description */}
            <p className="mt-8 text-lg leading-8 text-gray-600">
              {aboutContent.description}
            </p>

            {/* Features */}
            <ul className="mt-10 space-y-5">
              {aboutContent.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-lg text-gray-800"
                >
                  <span className="text-[#C9A96E] text-xl">✓</span>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <div className="mt-10">
              <Link
                href="/about"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C9A96E]
                  px-8
                  py-4
                  text-white
                  font-medium
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-[#b9965d]
                "
              >
                {aboutContent.button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
