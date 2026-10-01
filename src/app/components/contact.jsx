export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#2A2118] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-white lg:sticky lg:top-28">
            <p className="inline-flex border border-[#C9A45C] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#D6B56D] sm:text-xs">
              LET'S CREATE TOGETHER
            </p>

            <h2 className="mt-7 max-w-xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
              Let's Create Something
              <span className="block text-[#D6B56D]">Beautiful Together</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Tell us about your event, your vision, and the experience you want
              to create. Our team would love to help bring it to life.
            </p>

            <div className="mt-9 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#D6B56D]">Phone</p>
                <p className="mt-1 text-sm text-white/80">+92 300 1234567</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#D6B56D]">Email</p>
                <p className="mt-1 text-sm text-white/80">hello@sterlingbloom.com</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#D6B56D]">Location</p>
                <p className="mt-1 text-sm text-white/80">Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] bg-white p-6 shadow-2xl shadow-black/20 sm:p-9 lg:p-10">
            <div className="mb-8">
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-medium text-gray-900">
                Start Your Celebration
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Share a few details and we will get back to you.
              </p>
            </div>

            <form className="space-y-5">
              {[
                ["name", "Your Name", "text", "Enter your name"],
                ["email", "Email Address", "email", "Enter your email"],
                ["phone", "Phone Number", "tel", "Enter your phone number"],
              ].map(([id, label, type, placeholder]) => (
                <div key={id}>
                  <label htmlFor={id} className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-gray-500 sm:text-xs">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="event" className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-gray-500 sm:text-xs">
                  Event Type
                </label>
                <select
                  id="event"
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-600 outline-none transition focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10"
                >
                  <option value="" disabled>Select an event</option>
                  <option value="wedding">Wedding</option>
                  <option value="nikah">Nikah</option>
                  <option value="mehndi">Mehndi</option>
                  <option value="engagement">Engagement</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="private">Private Celebration</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-gray-500 sm:text-xs">
                  Tell Us About Your Event
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us about your event, date, venue, and vision..."
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#B68A35] focus:ring-2 focus:ring-[#B68A35]/10"
                />
              </div>

              <button type="submit" className="btn-primary w-full rounded-lg py-4 text-xs uppercase tracking-[0.18em]">
                Request Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
