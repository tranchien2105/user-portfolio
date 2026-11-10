import { lazy, Suspense } from "react";
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
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useLanguage, text } from "./hooks/useLanguage";

import { usePageMetadata } from "./hooks/usePageMetadata";
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const isProjectsPage =
  window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") ===
  "/projects";

function App() {
  usePageMetadata(isProjectsPage);
  useScrollReveal();
  useScrollProgress();
  const { language } = useLanguage();
  return (
    <>
      <a className="skip-link" href="#main">
        {text("Đến nội dung chính", "Skip to content", language)}
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress-fill" />
      </div>
      <Navbar projectsPage={isProjectsPage} />
      <main className="container" id="main" tabIndex={-1}>
        {isProjectsPage ? (
          <Suspense
            fallback={
              <p role="status" className="page-loading">
                {text("Đang tải dự án…", "Loading projects…", language)}
              </p>
            }
          >
            <ProjectsPage />
          </Suspense>
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </>
        )}
      </main>
      <div className="container">
        <Footer />
      </div>
    </>
  );
}

export default App;
