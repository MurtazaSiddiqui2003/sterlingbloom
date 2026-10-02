import Reveal from "./reveal";

export default function Process() {
  const processSteps = [
    { number: "01", title: "Consultation", description: "We listen to your ideas, understand your vision, and discover what makes your celebration unique." },
    { number: "02", title: "Concept & Moodboard", description: "We turn your ideas into a refined visual direction that brings your celebration to life." },
    { number: "03", title: "Planning", description: "We plan every detail with precision, from styling and florals to layout and execution." },
    { number: "04", title: "Installation", description: "Our team transforms the venue with careful attention to every design element." },
    { number: "05", title: "Celebrate", description: "Everything comes together beautifully, leaving you free to enjoy your special occasion." },
  ];

  return (
    <section id="process" className="bg-[#F8F7F4] py-14 sm:py-18 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="eyebrow">OUR PROCESS</p>
          <div className="mx-auto mt-5 h-px w-16 bg-[#B68A35]" />
          <h2 className="section-heading mx-auto mt-7 max-w-3xl">
            From Concept to Celebration
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            From the first conversation to the final detail, we carefully
            transform your vision into a memorable celebration.
          </p>
        </div>

        <Reveal className="relative mt-10 lg:mt-12">
          <div className="absolute left-[10%] right-[10%] top-[52px] hidden h-px bg-[#D8C39A] lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
            {processSteps.map((step, index) => (
              <div key={step.number} className="group relative px-3 text-center">
                <span className="text-[10px] font-medium tracking-[0.25em] text-[#B68A35]">
                  {step.number}
                </span>

                <div className="relative z-10 mx-auto mt-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#D6B56D] bg-[#F8F7F4] text-sm text-[#B68A35] transition-all duration-500 group-hover:border-[#B68A35] group-hover:bg-[#B68A35] group-hover:text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-medium leading-tight text-[#211d19]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-gray-500">
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
