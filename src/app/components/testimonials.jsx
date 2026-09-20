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
    <section
      id="testimonials"
      className="bg-[#F8F7F4] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section Heading */}
        <div className="text-center">

          <p className="eyebrow inline-flex">
            TESTIMONIALS
          </p>

          <div className="mx-auto mt-5 h-px w-20 bg-[#B68A35]" />

          <h2
            className="
              mt-8
              text-4xl
              font-light
              leading-tight
              tracking-tight
              sm:text-5xl
              lg:text-6xl
            "
          >
            Kind Words From Our Clients
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-gray-500
              sm:text-base
            "
          >
            Every celebration is personal. Here is what some of
            our clients have shared about their experience with
            Sterling Bloom.
          </p>

        </div>

        {/* Testimonial Cards */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-6
            md:grid-cols-3
            lg:mt-16
          "
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="
                group
                flex
                flex-col
                border
                border-gray-200
                bg-white
                p-8
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[#D6B56D]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.05)]
                lg:p-10
              "
            >

              {/* Stars */}
              <div
                className="
                  text-sm
                  tracking-[0.25em]
                  text-[#B68A35]
                "
              >
                ★★★★★
              </div>

              {/* Quote */}
              <p
                className="
                  mt-7
                  flex-1
                  text-base
                  leading-8
                  text-gray-600
                "
              >
                “{testimonial.review}”
              </p>

              {/* Divider */}
              <div className="mt-8 h-px w-10 bg-[#D6B56D]" />

              {/* Client */}
              <div className="mt-5">

                <h3 className="text-base font-medium text-gray-900">
                  {testimonial.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-[#B68A35]
                  "
                >
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