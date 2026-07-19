export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-amber-100 to-gray-200 max-w-screen mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-14 items-center"
    >
      <div>
        <p className="eyebrow uppercase mb-6">About Us</p>
        <h2 className="font-display text-3xl md:text-4xl mb-6">Our Story</h2>
        <p className="text-stone leading-relaxed mb-4">
          At Sterling Bloom, every celebration begins with a vision. We combine
          creativity, floral artistry, and thoughtful design to create events
          that feel personal, elegant, and unforgettable.
        </p>
        <p className="text-stone leading-relaxed mb-6">
          Every detail is intentionally designed.
        </p>
        <p className="font-display italic text-xl text-gold">
          We design moments you&apos;ll always remember.
        </p>
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src="/images/about.jpg"
          alt="Elegant table setting with candles and pink florals"
          className="absolute inset-0 w-auto h-full object-cover"
        />
      </div>
    </section>
  );
}
