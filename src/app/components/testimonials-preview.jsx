export default function TestimonialsPreview({ content }) {
  const items = content?.items || [];
  return (
    <section id="testimonials" className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{content?.eyebrow}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-4xl">{content?.heading}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">{content?.description}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {items.slice(0, 3).map((item, index) => (
            <article key={item.name + index} className={"relative flex min-h-[270px] flex-col overflow-hidden rounded-[22px] border bg-white p-6 sm:p-8 " + (index === 1 ? "border-[#D6B56D] shadow-[0_18px_50px_rgba(0,0,0,0.06)]" : "border-gray-200")}>
              <span className="absolute right-7 top-5 font-[family-name:var(--font-display)] text-7xl font-light leading-none text-[#D6B56D]/25" aria-hidden="true">“</span>
              <span className="relative z-10 text-xs tracking-[0.25em] text-[#B68A35]" aria-label="5 out of 5 stars">★★★★★</span>
              <p className="relative z-10 mt-5 flex-1 font-[family-name:var(--font-display)] text-lg leading-7 text-gray-700 sm:text-xl">“{item.review}”</p>
              <div className="mt-8 border-t border-gray-100 pt-5">
                <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#B68A35]">{item.event}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-6 text-gray-400">{content?.note}</p>
        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.18em] text-gray-400">Draft preview — review submission is disabled</p>
      </div>
    </section>
  );
}
