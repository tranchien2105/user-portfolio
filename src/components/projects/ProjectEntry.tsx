import type { ProjectItem } from "../../types/portfolio";
import { projectUrl } from "../../data/projects";
import { text, useLanguage } from "../../hooks/useLanguage";
import { ProjectScreenshot } from "./ProjectScreenshot";
import { ProjectLinks } from "./ProjectLinks";
function ProjectStack({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  return (
    <ul
      className="tag-list"
      aria-label={text("Công nghệ sử dụng", "Technology stack", language)}
    >
      {project.technologies.map((tech) => (
        <li className="tag" key={tech}>
          {tech}
        </li>
      ))}
    </ul>
  );
}
function FeaturedProject({
  project,
  index,
  lead,
}: {
  project: ProjectItem;
  index: number;
  lead: boolean;
}) {
  const { language } = useLanguage();
  return (
    <article
      className={`featured-project ${lead ? "project-featured" : "project-secondary"}`}
      id={project.slug}
      aria-labelledby={`title-${project.slug}`}
    >
      <div className="feature-overview">
        <p className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {project.kind[language]}
        </p>
        <h3 id={`title-${project.slug}`}>
          <a href={projectUrl(project)}>
            {project.name}
            <span aria-hidden="true">.</span>
          </a>
        </h3>
        <p className="project-subtitle">{project.subtitle[language]}</p>
        <p className="project-description">{project.summary[language]}</p>
      </div>
      <div className="feature-media">
        {project.screenshot ? (
          <ProjectScreenshot project={project} />
        ) : project.flow ? (
          <div className="project-flow">
            <p className="eyebrow">TECHNICAL FLOW</p>
            <ol>
              {project.flow.map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  <strong>{step}</strong>
                  {i < project.flow!.length - 1 && (
                    <span className="flow-arrow" aria-hidden="true">
                      ↓
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p>
              {text(
                "Luồng kỹ thuật được triển khai trong dự án",
                "A workflow implemented in the project",
                language,
              )}
            </p>
          </div>
        ) : null}
      </div>
      <div className="feature-engineering">
        <p className="contribution-label">
          {text("ĐIỂM NỔI BẬT KỸ THUẬT", "ENGINEERING HIGHLIGHTS", language)}
        </p>
        <ul className="detail-list">
          {project.contributions.slice(0, 2).map((line) => (
            <li key={line.en}>{line[language]}</li>
          ))}
        </ul>
        <ProjectStack project={project} />
      </div>
      <footer className="feature-actions">
        <ProjectLinks project={project} />
        <a className="project-read-more" href={projectUrl(project)}>
          {text("Chi tiết kỹ thuật", "Technical details", language)}{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </article>
  );
}

export function ProjectEntry({
  project,
  index,
  featured = false,
  lead = false,
}: {
  project: ProjectItem;
  index: number;
  featured?: boolean;
  lead?: boolean;
}) {
  const { language } = useLanguage();
  if (featured)
    return <FeaturedProject project={project} index={index} lead={lead} />;
  const Heading = "h2";
  const details = (
    <>
      <dl className="project-facts">
        <div>
          <dt>{text("Vai trò", "Role", language)}</dt>
          <dd>
            {project.role ??
              text(
                "Chưa bổ sung chức danh",
                "Role title not provided",
                language,
              )}
          </dd>
        </div>
        <div>
          <dt>{text("Thời gian", "Period", language)}</dt>
          <dd>
            {project.period?.replace(
              "Present",
              text("Hiện tại", "Present", language),
            ) ??
              text(
                "Chưa bổ sung mốc thời gian",
                "Dates not provided",
                language,
              )}
          </dd>
        </div>
      </dl>
      <p className="contribution-label">
        {text(
          "TRÁCH NHIỆM & ĐIỂM NỔI BẬT KỸ THUẬT",
          "RESPONSIBILITIES & TECHNICAL HIGHLIGHTS",
          language,
        )}
      </p>
      <ul className="detail-list">
        {project.contributions.map((line) => (
          <li key={line.en}>{line[language]}</li>
        ))}
      </ul>
      {project.notes?.map((note) => (
        <p className="project-note" key={note.en}>
          {note[language]}
        </p>
      ))}
    </>
  );
  return (
    <article
      className="project-entry archive-project"
      id={project.slug}
      aria-labelledby={`title-${project.slug}`}
    >
      <div className="project-identity">
        <p className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {project.kind[language]}
        </p>
        <Heading id={`title-${project.slug}`}>
          <a href={projectUrl(project)}>
            {project.name}
            <span aria-hidden="true">.</span>
          </a>
        </Heading>
        <p className="project-subtitle">{project.subtitle[language]}</p>
        <span className="project-discipline">{project.category}</span>
        <ProjectLinks project={project} />
      </div>
      <div className="project-body">
        <p className="project-description">{project.summary[language]}</p>
        <p className="contribution-label">
          {text("BÀI TOÁN", "THE PROBLEM", language)}
        </p>
        <p className="project-problem">{project.problem[language]}</p>
        <ul
          className="tag-list"
          aria-label={text("Công nghệ sử dụng", "Technology stack", language)}
        >
          {project.technologies.map((tech) => (
            <li className="tag" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
        <a className="project-read-more" href={projectUrl(project)}>
          {text("Đọc case study", "Read case study", language)} ↗
        </a>
        <details className="project-details">
          <summary>
            {text(
              "Vai trò & chi tiết kỹ thuật",
              "Role & technical details",
              language,
            )}{" "}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="project-details-content">
            {details}
            {project.screenshot ? (
              <ProjectScreenshot project={project} />
            ) : (
              <p className="project-media-status">
                {text(
                  "Screenshot chưa được bổ sung.",
                  "Screenshots have not been provided.",
                  language,
                )}
              </p>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}
