import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Gallery from "./components/gallery";
import Process from "./components/process";
import Packages from "./components/packages";
import Testimonials from "./components/testimonials";
import InstagramStrip from "./components/instagram-strip";
import Contact from "./components/contact";
import CalendlyBooking from "./components/calendly-booking";
import ScrollReveal from "./components/scroll-reveal";
import { getSiteContent } from "../lib/site-content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <ScrollReveal />
      {visible("hero") && <Hero content={content.hero} />}
      {visible("about") && <About content={content.about} />}
      {visible("services") && <Services content={content.services} />}
      {visible("gallery") && <Gallery content={content.gallery} />}
      {visible("process") && <Process content={content.process} />}
      {visible("packages") && <Packages content={content.packages} />}
      {visible("testimonials") && <Testimonials content={content.testimonials} />}
      {visible("instagramStrip") && <InstagramStrip content={content.instagramStrip} />}
      {visible("calendly") && <CalendlyBooking content={content.calendly} />}
      {visible("contact") && <Contact content={content.contact} />}
    </main>
  );
}
