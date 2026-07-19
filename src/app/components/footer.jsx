export default function Footer() {
  return (
    <section className="w-screen bg-gray-950 px-10 py-5 gap-30 md:grid lg:grid-cols-4 text-gray-300">
      <div className="flex flex-col gap-5 items-center">
        <img
          src="/images/logo.jpg"
          alt="STERLING BLOOM"
          className="h-10 w-10"
        />
        <p>
          Custom Event Design &amp; Decor for Weddings, Corporate Events &amp;
          Private Celebrations.
        </p>
      </div>

      <div className="flex flex-col text-center">
        <h4 className="text-center font-bold">Quick Links</h4>
        <div className="flex flex-col ">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#packages">Packages</a>
          <a href="reviews">Reviews</a>
        </div>
      </div>

      <div className="flex flex-col text-center">
        <h4 className="text-center font-bold">Contact Us</h4>
        <div className="flex flex-col ">
          <a href="tel:+1234567890">📞 &nbsp; +1-(234)-567-890</a>
          <a href="mailto:info@sterlingbloom.com">📩 &nbsp;info@sterlingbloom.com</a>
          <a href="#work">📍 &nbsp; Oakville, Ontario, Canada</a>
        </div>
      </div>

      <div className="flex flex-col text-center">
        <h4 className="text-center font-bold">Lets Stay Connected</h4>
        <div className="flex flex-col">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, deserunt.</p>
        </div>
      </div>
    </section>
  );
}
