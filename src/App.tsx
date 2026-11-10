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

import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import NotFoundPage from "./pages/NotFoundPage";
import InteractiveTools from "./components/ui/InteractiveTools";
import { resolveRoute } from "./lib/routes";
import { projects } from "./data/projects";
import { usePageMetadata } from "./hooks/usePageMetadata";
import { LoadingState } from "./components/ui/LoadingState";
import { DailyWelcome } from "./components/ui/DailyWelcome";
import { NavigationFeedback } from "./components/ui/NavigationFeedback";
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const route = resolveRoute(window.location.pathname);
const project =
  route.kind === "case-study"
    ? projects.find((project) => project.slug === route.slug)
    : undefined;

function App() {
  usePageMetadata(route);
  useScrollReveal();
  useScrollProgress();
  const { language } = useLanguage();
  return (
    <>
      <NavigationFeedback />
      <DailyWelcome />
      <a className="skip-link" href="#main">
        {text("Đến nội dung chính", "Skip to content", language)}
      </a>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress-fill" />
      </div>
      <Navbar projectsPage={route.kind !== "home"} />
      <main className="container" id="main" tabIndex={-1}>
        {route.kind === "case-study" && project ? (
          <ProjectCaseStudy project={project} />
        ) : route.kind === "not-found" ? (
          <NotFoundPage />
        ) : route.kind === "projects" ? (
          <Suspense fallback={<LoadingState />}>
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
      <InteractiveTools />
    </>
  );
}

export default App;
