// export default function Footer() {
//   return (
//     <section className="w-screen bg-gray-950 px-10 py-5 gap-30 md:grid lg:grid-cols-4 text-gray-300">
//       <div className="flex flex-col gap-5 items-center">
//         <img
//           src="/images/logo.jpg"
//           alt="STERLING BLOOM"
//           className="h-10 w-10"
//         />
//         <p>
//           Custom Event Design &amp; Decor for Weddings, Corporate Events &amp;
//           Private Celebrations.
//         </p>
//       </div>

//       <div className="flex flex-col text-center">
//         <h4 className="text-center font-bold">Quick Links</h4>
//         <div className="flex flex-col ">
//           <a href="#about">About</a>
//           <a href="#services">Services</a>
//           <a href="#work">Work</a>
//           <a href="#process">Process</a>
//           <a href="#packages">Packages</a>
//           <a href="reviews">Reviews</a>
//         </div>
//       </div>

//       <div className="flex flex-col text-center">
//         <h4 className="text-center font-bold">Contact Us</h4>
//         <div className="flex flex-col ">
//           <a href="tel:+1234567890">📞 &nbsp; +1-(234)-567-890</a>
//           <a href="mailto:info@sterlingbloom.com">📩 &nbsp;info@sterlingbloom.com</a>
//           <a href="#work">📍 &nbsp; Oakville, Ontario, Canada</a>
//         </div>
//       </div>

//       <div className="flex flex-col text-center">
//         <h4 className="text-center font-bold">Lets Stay Connected</h4>
//         <div className="flex flex-col">
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, deserunt.</p>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Footer() {
  return (
    <footer className="bg-[#1D1813] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-light tracking-wide">
              Sterling Bloom
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              Thoughtfully designed celebrations, beautiful spaces, and
              unforgettable experiences crafted with intention.
            </p>

            <div className="mt-7 flex gap-4">
              <a
                href="#"
                className="text-xs uppercase tracking-[0.15em] text-white/60 transition hover:text-[#D6B56D]"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-xs uppercase tracking-[0.15em] text-white/60 transition hover:text-[#D6B56D]"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D6B56D]">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#portfolio"
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  Portfolio
                </a>
              </li>

              <li>
                <a
                  href="#process"
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  Our Process
                </a>
              </li>

              <li>
                <a
                  href="#packages"
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#D6B56D]">
              Contact
            </h3>

            <div className="mt-6 space-y-4 text-sm text-white/55">
              <p>Karachi, Pakistan</p>

              <p>+92 300 1234567</p>

              <p>hello@sterlingbloom.com</p>
            </div>

            <a
              href="#contact"
              className="
                mt-7
                inline-block
                border
                border-[#B68A35]
                px-6
                py-3
                text-xs
                uppercase
                tracking-[0.15em]
                text-[#D6B56D]
                transition-all
                duration-300
                hover:bg-[#B68A35]
                hover:text-white
              "
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            py-6
            text-xs
            text-white/35
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()} Sterling Bloom Decor. All rights
            reserved.
          </p>

          <p>Designed with intention.</p>
        </div>
      </div>
    </footer>
  );
}
