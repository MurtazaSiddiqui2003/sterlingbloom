export default function Process() {
  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We listen to your ideas, understand your vision, and discover what makes your celebration unique.",
    },
    {
      number: "02",
      title: "Concept & Moodboard",
      description:
        "We turn your ideas into a refined visual direction that brings your celebration to life.",
    },
    {
      number: "03",
      title: "Planning",
      description:
        "We plan every detail with precision, from styling and florals to layout and execution.",
    },
    {
      number: "04",
      title: "Installation",
      description:
        "Our team transforms the venue with careful attention to every design element.",
    },
    {
      number: "05",
      title: "Celebrate",
      description:
        "Everything comes together beautifully, leaving you free to enjoy your special occasion.",
    },
  ];

  return (
    <section
      id="process"
      className="bg-[#F8F7F4] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}
        <div className="text-center">

          <p className="eyebrow inline-flex">
            OUR PROCESS
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
            From Concept to Celebration
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
            From the first conversation to the final detail,
            we carefully transform your vision into a memorable
            celebration.
          </p>

        </div>

        {/* Process Steps */}
        <div className="relative mt-16 lg:mt-20">

          {/* Connecting Line - Desktop */}
          <div
            className="
              absolute
              left-[10%]
              right-[10%]
              top-[52px]
              hidden
              h-px
              bg-[#D8C39A]
              lg:block
            "
          />

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">

            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="
                  group
                  relative
                  px-5
                  text-center
                "
              >

                {/* Number */}
                <span
                  className="
                    text-xs
                    tracking-[0.25em]
                    text-[#B68A35]
                  "
                >
                  {step.number}
                </span>

                {/* Step Circle */}
                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    mt-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D6B56D]
                    bg-[#F8F7F4]
                    text-sm
                    text-[#B68A35]
                    transition-all
                    duration-500
                    group-hover:border-[#B68A35]
                    group-hover:bg-[#B68A35]
                    group-hover:text-white
                  "
                >
                  {index + 1}
                </div>

                {/* Title */}
                <h3
                  className="
                    mt-6
                    text-lg
                    font-normal
                    text-gray-900
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-[220px]
                    text-sm
                    leading-6
                    text-gray-500
                  "
                >
                  {step.description}
                </p>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}