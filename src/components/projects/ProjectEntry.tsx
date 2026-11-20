import { caseStudies } from "../../data/caseStudies";
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
function CompactProject({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  return (
    <article
      className="compact-project"
      id={project.slug}
      aria-labelledby={`title-${project.slug}`}
    >
      <header>
        <h3 id={`title-${project.slug}`}>
          <a href={projectUrl(project)}>{project.name}</a>
        </h3>
        <p>
          {project.period?.replace(
            "Present",
            text("Hiện tại", "Present", language),
          ) ?? project.category}
        </p>
      </header>
      <div className="compact-project-copy">
        <p>{project.summary[language]}</p>
        <p className="compact-stack">{project.technologies.join(", ")}</p>
        <div className="compact-project-links">
          <ProjectLinks project={project} />
          <a className="text-link" href={projectUrl(project)}>
            {text("Đọc case study", "Read case study", language)}
          </a>
        </div>
        <details className="compact-project-details">
          <summary>
            {text(
              "Bài toán & cách triển khai",
              "Problem & implementation",
              language,
            )}
          </summary>
          <p>{project.problem[language]}</p>
          <ul className="detail-list">
            {project.contributions.map((line) => (
              <li key={line.en}>{line[language]}</li>
            ))}
          </ul>
          {project.flow && (
            <p className="compact-flow">{project.flow.join(" → ")}</p>
          )}
          {project.screenshot && <ProjectScreenshot project={project} />}
        </details>
      </div>
    </article>
  );
}

function FeaturedProject({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  const study = caseStudies[project.slug];
  const implementation = study?.solution ?? project.contributions;
  const stack = study?.implementationStack ?? project.technologies;
  return (
    <article
      className="featured-project project-featured"
      id={project.slug}
      aria-labelledby={`title-${project.slug}`}
    >
      <div className="feature-overview">
        <p className="eyebrow">{project.kind[language]}</p>
        <h3 id={`title-${project.slug}`}>
          <a href={projectUrl(project)}>{project.name}</a>
        </h3>
        <p className="project-subtitle">{project.subtitle[language]}</p>
        <p className="project-description">{project.summary[language]}</p>
        <dl className="feature-facts">
          {project.role && (
            <div>
              <dt>{text("Vai trò", "Role", language)}</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          {project.period && (
            <div>
              <dt>{text("Thời gian", "Period", language)}</dt>
              <dd>
                {project.period.replace(
                  "Present",
                  text("Hiện tại", "Present", language),
                )}
              </dd>
            </div>
          )}
        </dl>
        <p className="feature-stack">
          <span>
            {text("Source hiện tại", "Current implementation", language)}
          </span>
          {stack.join(" · ")}
        </p>
        <ProjectLinks project={project} />
      </div>
      {project.screenshot && (
        <div className="feature-media">
          <ProjectScreenshot project={project} />
        </div>
      )}
      <div className="feature-engineering">
        <div className="engineering-problem">
          <h4>{text("Bài toán cần giải quyết", "The problem", language)}</h4>
          <p className="project-problem">{project.problem[language]}</p>
          <h4>{text("Phần triển khai", "Implementation", language)}</h4>
          <ul className="detail-list">
            {implementation.map((line) => (
              <li key={line.en}>{line[language]}</li>
            ))}
          </ul>
        </div>
        <div className="engineering-notes">
          <h4>
            {text(
              "Những quyết định kỹ thuật",
              "Engineering decisions",
              language,
            )}
          </h4>
          <dl className="engineering-decisions">
            {study?.challenges.map((item) => (
              <div key={item.title.en}>
                <dt>{item.title[language]}</dt>
                <dd>{item.approach[language]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {study?.evidenceNote && (
        <details className="project-source-note">
          <summary>
            {text(
              "Stack triển khai & thông tin đối chiếu CV",
              "Implementation stack & CV comparison",
              language,
            )}
          </summary>
          <p>{study.evidenceNote[language]}</p>
          <h4>
            {text("Ghi nhận trong CV", "As recorded in the CV", language)}
          </h4>
          <ProjectStack project={project} />
          <ul className="detail-list">
            {project.contributions.map((line) => (
              <li key={line.en}>{line[language]}</li>
            ))}
          </ul>
        </details>
      )}
      <footer className="feature-actions">
        <a className="button button-secondary" href={projectUrl(project)}>
          {text(
            "Xem kiến trúc & toàn bộ case study",
            "Explore the architecture & full case study",
            language,
          )}
        </a>
      </footer>
    </article>
  );
}

export function ProjectEntry({
  project,
  featured = false,
  lead = false,
}: {
  project: ProjectItem;
  featured?: boolean;
  lead?: boolean;
}) {
  const { language } = useLanguage();
  if (featured)
    return lead ? (
      <FeaturedProject project={project} />
    ) : (
      <CompactProject project={project} />
    );
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
        <p className="eyebrow">{project.kind[language]}</p>
        <Heading id={`title-${project.slug}`}>
          <a href={projectUrl(project)}>{project.name}</a>
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
          {text("Đọc case study", "Read case study", language)}
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
