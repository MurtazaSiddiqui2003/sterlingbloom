import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Gallery from "./components/gallery";
import Process from "./components/process";
import Packages from "./components/packages";
import Testimonials from "./components/testimonials";
import Contact from "./components/contact";
import ScrollReveal from "./components/scroll-reveal";

export default function Home() {
  return (
    <main>
      <ScrollReveal />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Process />
      <Packages />
      <Testimonials />
      <Contact />
    </main>
  );
}
