import Image from "next/image";
import Link from "next/link";
import aboutContent from "./constants/about";

export default function About() {
  return (
    <section data-reveal id="about" className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        
          <div>
            <div className="group relative h-[460px] overflow-hidden rounded-[28px] shadow-2xl shadow-black/10 sm:h-[600px] lg:h-[720px]">
              <Image
                src="/images/about.jpg"
                alt="Luxury wedding decor by Sterling Bloom"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
            </div>
          </div>

          <div className="lg:pt-6">
            <p className="eyebrow">{aboutContent.eyebrow}</p>
            <div className="mt-5 mb-7 h-px w-16 bg-[#C9A96E]" />

            <h2 className="section-heading max-w-xl">
              {aboutContent.title.before}{" "}
              <span className="text-[#B68A35]">{aboutContent.title.highlight}</span>{" "}
              {aboutContent.title.after}
            </h2>

            <p className="section-copy mt-6 max-w-xl">
              {aboutContent.description}
            </p>

            <ul className="mt-8 space-y-4">
              {aboutContent.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-base text-gray-800 sm:text-lg"
                >
                  <span className="mt-0.5 text-[#C9A96E]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Link href="#contact" className="btn-primary">
                {aboutContent.button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
