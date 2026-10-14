import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { usePointerAmbient } from "./hooks/usePointerAmbient";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useClickFeedback } from "./hooks/useClickFeedback";

function App() {
  useScrollReveal();
  usePointerAmbient();
  useScrollProgress();
  useClickFeedback();
  return (
    <>
      <div className="scroll-progress" role="progressbar" aria-label="Page scroll progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}><span className="scroll-progress-fill" /></div>
      <div className="ambient-layer" aria-hidden="true"><span /><span /><span /></div>
      <Navbar />

      <main className="container">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <div className="container"><Footer /></div>
    </>
  );
}

export default App;
