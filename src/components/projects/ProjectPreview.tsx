import type { ProjectItem } from "../../types/portfolio";
import { caseStudies } from "../../data/caseStudies";
import { projectUrl } from "../../data/projects";
import { text, useLanguage } from "../../hooks/useLanguage";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectScreenshot } from "./ProjectScreenshot";

export function ProjectPreview({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  const study = caseStudies[project.slug];
  return (
    <article
      className="project-preview"
      id={project.slug}
      aria-labelledby={`title-${project.slug}`}
    >
      <div className="preview-overview">
        <p className="eyebrow">{project.kind[language]}</p>
        <h3 id={`title-${project.slug}`}>
          <a href={projectUrl(project)}>{project.name}</a>
        </h3>
        <p className="project-subtitle">{project.subtitle[language]}</p>
        <p>{project.summary[language]}</p>
        {project.screenshot ? (
          <ProjectScreenshot project={project} />
        ) : (
          project.flow && (
            <div className="preview-workflow">
              <h4>{text("Luồng xử lý", "Workflow", language)}</h4>
              <ol>
                {project.flow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          )
        )}
        <ProjectLinks project={project} />
      </div>
      <div className="preview-engineering">
        <h4>
          {text(
            "Bài toán & phần mình triển khai",
            "The problem & my implementation",
            language,
          )}
        </h4>
        <p>{project.problem[language]}</p>
        <ul className="detail-list">
          {project.contributions.map((line) => (
            <li key={line.en}>{line[language]}</li>
          ))}
        </ul>
        {study && study.challenges.length > 0 && (
          <dl className="preview-decisions">
            {study.challenges.map((item) => (
              <div key={item.title.en}>
                <dt>{item.title[language]}</dt>
                <dd>{item.approach[language]}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="preview-stack">{project.technologies.join(" · ")}</p>
        {project.notes?.map((note) => (
          <p className="project-note" key={note.en}>
            {note[language]}
          </p>
        ))}
        <a className="project-read-more" href={projectUrl(project)}>
          {text(
            "Xem kiến trúc & case study",
            "Read the architecture & case study",
            language,
          )}
        </a>
      </div>
    </article>
  );
}
