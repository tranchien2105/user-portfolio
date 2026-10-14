import { projects } from "../../data/portfolio";
import { useLanguage, text } from "../../hooks/useLanguage";

export default function Projects() {
  const { language } = useLanguage();
  return (
    <section className="section" id="projects">
      <p className="eyebrow">$ ls -la ./projects</p>
      <h2 className="section-title">{text('DỰ ÁN', 'PROJECTS', language)}</h2>

      <p className="section-description">
        A selection of projects demonstrating my experience with backend
        engineering, modern web development, and system design.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className="panel project-card" key={project.name}>
            <div className="project-heading">
              <span className="project-icon" aria-hidden="true">
                {"{ }"}
              </span>

              <span className="project-number">
                PROJECT_{String(index + 1).padStart(2, "0")}
              </span>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.name} on GitHub`}
              >
                ↗
              </a>
            </div>

            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>

            <div className="tag-list">
              {project.technologies.map((technology) => (
                <span className="tag" key={technology}>
                  {technology}
                </span>
              ))}
            </div>

            <a
              className="project-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View source code <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
