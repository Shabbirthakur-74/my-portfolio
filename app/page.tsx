import Hero from "./section/home";
import Skills from "./section/skills";
import Services from "./section/services";
import Projects from "./section/projects";
import Contact from "./section/contact";

export default function Home() {
  return (
      <main>
        <Hero />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
  );
}
