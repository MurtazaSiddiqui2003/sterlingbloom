export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#2A2118] py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left Content */}
          <div className="text-white">
            <p className="inline-flex border border-[#C9A45C] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#D6B56D]">
              LETS CREATE TOGETHER
            </p>

            <h2
              className="
                mt-7
                max-w-xl
                text-4xl
                font-light
                leading-tight
                sm:text-5xl
                lg:text-6xl
              "
            >
              Lets Create Something
              <span className="block text-[#D6B56D]">Beautiful Together</span>
            </h2>

            <p
              className="
                mt-6
                max-w-lg
                text-sm
                leading-7
                text-white/65
                sm:text-base
              "
            >
              Tell us about your event, your vision, and the experience you want
              to create. Our team would love to help bring it to life.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#D6B56D]">
                  Phone
                </p>

                <p className="mt-1 text-sm text-white/80">+92 300 1234567</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#D6B56D]">
                  Email
                </p>

                <p className="mt-1 text-sm text-white/80">
                  hello@sterlingbloom.com
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#D6B56D]">
                  Location
                </p>

                <p className="mt-1 text-sm text-white/80">Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-7 sm:p-10">
            <div className="mb-8">
              <h3 className="text-2xl font-light text-gray-900">
                Start Your Celebration
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Share a few details and we will get back to you.
              </p>
            </div>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs uppercase tracking-[0.12em] text-gray-500"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="
                    w-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#B68A35]
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs uppercase tracking-[0.12em] text-gray-500"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#B68A35]
                  "
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs uppercase tracking-[0.12em] text-gray-500"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="
                    w-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#B68A35]
                  "
                />
              </div>

              {/* Event Type */}
              <div>
                <label
                  htmlFor="event"
                  className="mb-2 block text-xs uppercase tracking-[0.12em] text-gray-500"
                >
                  Event Type
                </label>

                <select
                  id="event"
                  defaultValue=""
                  className="
                    w-full
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-gray-600
                    outline-none
                    transition
                    focus:border-[#B68A35]
                  "
                >
                  <option value="" disabled>
                    Select an event
                  </option>

                  <option value="wedding">Wedding</option>

                  <option value="nikah">Nikah</option>

                  <option value="mehndi">Mehndi</option>

                  <option value="engagement">Engagement</option>

                  <option value="corporate">Corporate Event</option>

                  <option value="private">Private Celebration</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs uppercase tracking-[0.12em] text-gray-500"
                >
                  Tell Us About Your Event
                </label>

                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us about your event, date, venue, and vision..."
                  className="
                    w-full
                    resize-none
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#B68A35]
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  w-full
                  bg-[#B68A35]
                  py-3.5
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#9F762E]
                "
              >
                Request Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
