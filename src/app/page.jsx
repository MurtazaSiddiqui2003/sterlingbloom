import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Gallery from "./components/gallery";
import Process from "./components/process";
import Packages from "./components/packages";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import ScrollReveal from "./components/scroll-reveal";
import { getSiteContent } from "../lib/site-content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <ScrollReveal />
      <Hero content={content.hero} />
      <About content={content.about} />
      <Services content={content.services} />
      <Gallery content={content.gallery} />
      <Process content={content.process} />
      <Packages content={content.packages} />
      <Testimonials content={content.testimonials} />
      <Contact content={content.contact} />
    </main>
  );
}
