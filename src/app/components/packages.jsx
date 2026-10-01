export default function Packages() {
  const packages = [
    {
      name: "Bronze",
      description:
        "Perfect for intimate celebrations with elegant styling and thoughtful details.",
      features: ["Event styling", "Basic floral arrangements", "Table styling"],
    },
    {
      name: "Silver",
      description:
        "A refined experience combining thoughtful design with elevated event styling.",
      features: [
        "Complete event styling",
        "Premium floral arrangements",
        "Customized decor",
        "Table styling",
      ],
      featured: true,
    },
    {
      name: "Gold",
      description:
        "Our complete experience for celebrations where every detail deserves attention.",
      features: [
        "Full event design",
        "Premium floral styling",
        "Customized decor",
        "Venue transformation",
        "Dedicated planning support",
      ],
    },
  ];

  return (
    <section id="packages" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">PACKAGES</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-3xl">
            Choose Your Experience
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Thoughtfully designed experiences that can be tailored to the
            style, scale, and vision of your event.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3 lg:gap-6">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={
                "relative flex flex-col rounded-[22px] border bg-[#F8F7F4] p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8 lg:p-10 " +
                (pkg.featured
                  ? "border-[#B68A35] shadow-[0_18px_55px_rgba(0,0,0,0.08)]"
                  : "border-gray-200 hover:border-[#D6B56D]")
              }
            >
              {pkg.featured && (
                <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-[#B68A35] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white">
                  Most Popular
                </span>
              )}

              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-[#B68A35]">
                  {pkg.name}
                </p>
                <div className="mx-auto mt-5 h-px w-10 bg-[#D6B56D]" />
                <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-gray-500">
                  {pkg.description}
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                    <span className="mt-0.5 text-[#B68A35]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={
                  "mt-10 inline-flex w-full items-center justify-center rounded-full border py-3.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 " +
                  (pkg.featured
                    ? "border-[#B68A35] bg-[#B68A35] text-white hover:bg-[#9F762E]"
                    : "border-[#B68A35] text-[#B68A35] hover:bg-[#B68A35] hover:text-white")
                }
              >
                Request Pricing
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
