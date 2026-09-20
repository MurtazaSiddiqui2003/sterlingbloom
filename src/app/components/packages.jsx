export default function Packages() {
  const packages = [
    {
      name: "Bronze",
      description:
        "Perfect for intimate celebrations with elegant styling and thoughtful details.",
      features: [
        "Event styling",
        "Basic floral arrangements",
        "Table styling",
      ],
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
    <section
      id="packages"
      className="bg-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center">

          <p className="eyebrow inline-flex">
            PACKAGES
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
            Choose Your Experience
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
            Thoughtfully designed experiences that can be
            tailored to the style, scale, and vision of your event.
          </p>

        </div>

        {/* Package Cards */}
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
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`
                group
                relative
                flex
                flex-col
                border
                p-8
                transition-all
                duration-500
                lg:p-10
                ${
                  pkg.featured
                    ? "border-[#B68A35] shadow-[0_15px_50px_rgba(0,0,0,0.06)]"
                    : "border-gray-200 hover:border-[#D6B56D]"
                }
              `}
            >

              {/* Featured Label */}
              {pkg.featured && (
                <span
                  className="
                    absolute
                    right-6
                    top-0
                    -translate-y-1/2
                    bg-[#B68A35]
                    px-4
                    py-1.5
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-white
                  "
                >
                  Most Popular
                </span>
              )}

              {/* Package Name */}
              <div className="text-center">

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.25em]
                    text-[#B68A35]
                  "
                >
                  {pkg.name}
                </p>

                <div
                  className="
                    mx-auto
                    mt-5
                    h-px
                    w-10
                    bg-[#D6B56D]
                  "
                />

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-sm
                    text-sm
                    leading-7
                    text-gray-500
                  "
                >
                  {pkg.description}
                </p>

              </div>

              {/* Features */}
              <ul className="mt-8 space-y-4">

                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-600
                    "
                  >
                    <span className="text-[#B68A35]">
                      ✓
                    </span>

                    {feature}
                  </li>
                ))}

              </ul>

              {/* Button */}
              <button
                className={`
                  mt-10
                  w-full
                  border
                  py-3
                  text-xs
                  uppercase
                  tracking-[0.15em]
                  transition-all
                  duration-300
                  ${
                    pkg.featured
                      ? "border-[#B68A35] bg-[#B68A35] text-white hover:bg-[#9F762E]"
                      : "border-[#B68A35] text-[#B68A35] hover:bg-[#B68A35] hover:text-white"
                  }
                `}
              >
                Request Pricing
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}