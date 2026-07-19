export default function Hero(){
    return(
        <section id="home" className="relative max-w-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-h-full w-screen -translate-x-1/2 -translate-y-1/2 object-cover z-0"
        >
          <source src="/videos/hero.mp4" type="video/mp4" className="z-0" />
          <source src="/videos/hero.webm" type="video/webm" className="z-0" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative max-w-120 md:max-w-150 z-10 flex flex-col justify-center items-left min-h-screen text-white text-center md:text-left px-4">
          <h1 className="text-3xl md:text-5xl px-8 py-4">Creating <span className="special-text">Meaningful Celebrations</span> Through Elegant Designs</h1>
          <p className="text-xl px-8 py-4">Custom Event Design &amp; Decor for Weddings, Corporate Events &amp; Private Celebrations.</p>
          <div className="uppercase flex-col px-8 py-5 flex md:flex-row gap-2">
            <a href="contact" className="btn-primary">Book A Constultation</a>
            <a href="portfolio" className="btn-ghost">View Our Work</a>
          </div>
        </div>
      </section>
    )
}
