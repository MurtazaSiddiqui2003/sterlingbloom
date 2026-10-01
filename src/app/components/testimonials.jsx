const testimonials = [
  {
    name: "Ayesha & Hamza",
    event: "Wedding",
    review:
      "Sterling Bloom turned our wedding vision into something even more beautiful than we imagined. Every detail felt thoughtful and perfectly executed.",
  },
  {
    name: "Sarah Khan",
    event: "Nikah Ceremony",
    review:
      "The attention to detail and creativity were incredible. Our Nikah setup felt elegant, intimate, and completely personal to us.",
  },
  {
    name: "Hassan Malik",
    event: "Corporate Event",
    review:
      "Professional from start to finish. The team understood our requirements and transformed the venue into a beautiful experience for our guests.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#F8F7F4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">TESTIMONIALS</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-4xl">
            Kind Words From Our Clients
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Every celebration is personal. Here is what some of our clients
            have shared about their experience with Sterling Bloom.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group flex flex-col rounded-[22px] border border-gray-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#D6B56D] hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] sm:p-8 lg:p-10"
            >
              <div className="text-sm tracking-[0.25em] text-[#B68A35]" aria-label="5 out of 5 stars">
                ★★★★★
              </div>

              <p className="mt-7 flex-1 font-[family-name:var(--font-display)] text-xl leading-8 text-gray-700 sm:text-2xl">
                “{testimonial.review}”
              </p>

              <div className="mt-8 h-px w-10 bg-[#D6B56D]" />

              <div className="mt-5">
                <h3 className="text-base font-medium text-gray-900">{testimonial.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#B68A35]">
                  {testimonial.event}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
