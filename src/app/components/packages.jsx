export default function Packages({ content }) {
  return (
    <section data-reveal id="packages" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-3xl">{content.heading}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">{content.description}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-start">
          {content.items.map((pkg, index) => (
            <article key={pkg.name || index} className={"relative flex flex-col rounded-[22px] border bg-[#F8F7F4] p-7 transition-all duration-500 sm:p-8 lg:p-10 " + (pkg.featured ? "border-[#B68A35] shadow-[0_18px_55px_rgba(0,0,0,0.08)] md:-translate-y-2" : "border-gray-200")}>
              {pkg.featured && <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-[#B68A35] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">{content.featuredLabel}</span>}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#B68A35]">Package 0{index + 1}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-medium text-[#211d19] sm:text-4xl">{pkg.name}</h3>
                </div>
                <span className="font-[family-name:var(--font-display)] text-4xl font-light text-[#D6B56D]/45">0{index + 1}</span>
              </div>
              <div className="mt-6 h-px w-12 bg-[#D6B56D]" />
              <p className="mt-6 text-sm leading-7 text-gray-500">{pkg.description}</p>
              <ul className="mt-8 space-y-4">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D6B56D] text-[9px] text-[#B68A35]" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={"mt-10 inline-flex w-full items-center justify-center rounded-[10px] border py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 " + (pkg.featured ? "border-[#B68A35] bg-[#B68A35] text-white hover:bg-[#9F762E]" : "border-[#B68A35] text-[#B68A35] hover:bg-[#B68A35] hover:text-white")}>
                {content.button}
              </a>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-6 text-gray-400">{content.note}</p>
      </div>
    </section>
  );
}
