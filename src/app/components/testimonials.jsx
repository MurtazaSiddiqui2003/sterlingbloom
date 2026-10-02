export default function Testimonials({ content }) {
  return (
    <section data-reveal id="testimonials" className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">{content.eyebrow}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-4xl">{content.heading}</h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">{content.description}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {content.items.map((testimonial, index) => (
            <article key={testimonial.name || index} className={"relative flex flex-col overflow-hidden rounded-[22px] border bg-white p-7 sm:p-8 lg:p-10 " + (index === 1 ? "border-[#D6B56D] shadow-[0_18px_50px_rgba(0,0,0,0.06)] md:-translate-y-2" : "border-gray-200")}>
              <span className="absolute right-7 top-5 font-[family-name:var(--font-display)] text-7xl font-light leading-none text-[#D6B56D]/25" aria-hidden="true">“</span>
              <div className="relative z-10 flex items-center justify-between gap-4">
                <span className="text-xs tracking-[0.25em] text-[#B68A35]" aria-label="5 out of 5 stars">★★★★★</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">{content.label}</span>
              </div>
              <p className="relative z-10 mt-7 flex-1 font-[family-name:var(--font-display)] text-xl leading-8 text-gray-700 sm:text-2xl">“{testimonial.review}”</p>
              <div className="mt-8 flex items-end justify-between gap-4 border-t border-gray-100 pt-5">
                <div>
                  <h3 className="text-base font-medium text-gray-900">{testimonial.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#B68A35]">{testimonial.event}</p>
                </div>
                <span className="font-[family-name:var(--font-display)] text-2xl text-[#D6B56D]/50">0{index + 1}</span>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-6 text-gray-400">{content.note}</p>
      </div>
    </section>
  );
}
