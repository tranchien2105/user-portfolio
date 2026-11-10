import type { ReactNode } from "react";
import type { ProjectItem } from "../types/portfolio";
import { caseStudies } from "../data/caseStudies";
import { projects, projectUrl } from "../data/projects";
import { text, useLanguage } from "../hooks/useLanguage";
import { ProjectLinks } from "../components/projects/ProjectLinks";
import { ProjectScreenshot } from "../components/projects/ProjectScreenshot";
import { InteractiveArchitecture } from "../components/projects/InteractiveArchitecture";
function CaseSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="case-section" id={id}>
      <p className="eyebrow">{number} / CASE STUDY</p>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
export default function ProjectCaseStudy({
  project,
}: {
  project: ProjectItem;
}) {
  const { language } = useLanguage();
  const study = caseStudies[project.slug] ?? {
    challenges: [],
    references: project.sources,
  };
  const sections = [
    { id: "overview", vi: "Tổng quan", en: "Overview" },
    { id: "problem", vi: "Bài toán", en: "Problem" },
    { id: "solution", vi: "Giải pháp", en: "Solution" },
    { id: "architecture", vi: "Kiến trúc", en: "Architecture" },
    { id: "stack", vi: "Công nghệ", en: "Tech stack" },
    { id: "challenges", vi: "Thách thức", en: "Challenges" },
    { id: "screenshots", vi: "Hình ảnh", en: "Screenshots" },
  ];
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="case-study">
      <nav
        className="case-breadcrumb"
        aria-label={text("Đường dẫn", "Breadcrumb", language)}
      >
        <a href="/">{text("Trang chủ", "Home", language)}</a>
        <span aria-hidden="true">/</span>
        <a href="/projects/">Projects</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.name}</span>
      </nav>
      <header className="case-header" id="overview">
        <p className="eyebrow">
          {project.category.toUpperCase()} / PROJECT CASE STUDY
        </p>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p className="case-subtitle">{project.subtitle[language]}</p>
        <p className="case-summary">{project.summary[language]}</p>
        <dl className="case-facts">
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
              ) ?? text("Chưa bổ sung", "Not provided", language)}
            </dd>
          </div>
          <div>
            <dt>{text("Phạm vi", "Scope", language)}</dt>
            <dd>{project.kind[language]}</dd>
          </div>
        </dl>
        <ProjectLinks project={project} />
      </header>
      <div className="case-layout">
        <nav
          className="case-toc"
          aria-label={text(
            "Mục lục case study",
            "Case study contents",
            language,
          )}
        >
          <p className="eyebrow">ON THIS PAGE</p>
          {sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <span>0{i + 1}</span>
              {section[language]}
            </a>
          ))}
        </nav>
        <div className="case-content">
          <CaseSection
            id="problem"
            number="02"
            title={text("Bài toán thực tế", "The problem", language)}
          >
            <p className="case-lead">{project.problem[language]}</p>
          </CaseSection>
          <CaseSection
            id="solution"
            number="03"
            title={text(
              "Giải pháp & phần việc",
              "Solution & responsibilities",
              language,
            )}
          >
            <ul className="case-solutions">
              {(study.solution ?? project.contributions).map((line, i) => (
                <li key={line.en}>
                  <span>0{i + 1}</span>
                  <p>{line[language]}</p>
                </li>
              ))}
            </ul>
          </CaseSection>
          <CaseSection
            id="architecture"
            number="04"
            title={text(
              "Kiến trúc tương tác",
              "Interactive architecture",
              language,
            )}
          >
            {study.architecture ? (
              <InteractiveArchitecture architecture={study.architecture} />
            ) : (
              <p className="case-missing">
                {text(
                  "Chưa có đủ dữ liệu xác thực về kết nối giữa các thành phần để dựng sơ đồ cho dự án này.",
                  "There is not enough verified information about component connections to draw this project’s architecture.",
                  language,
                )}
              </p>
            )}
          </CaseSection>
          <CaseSection
            id="stack"
            number="05"
            title={text("Công nghệ sử dụng", "Technology stack", language)}
          >
            {study.implementationStack && (
              <p className="case-stack-label">
                {text(
                  "Source hiện tại đã audit",
                  "Current audited implementation",
                  language,
                )}
              </p>
            )}
            <ul className="case-stack">
              {(study.implementationStack ?? project.technologies).map(
                (tech) => (
                  <li key={tech}>{tech}</li>
                ),
              )}
            </ul>
            {study.implementationStack && (
              <details className="case-cv-stack">
                <summary>
                  {text(
                    "Đối chiếu stack được ghi trong CV",
                    "Compare the stack listed in the CV",
                    language,
                  )}
                </summary>
                <p>{project.technologies.join(" · ")}</p>
              </details>
            )}
          </CaseSection>
          <CaseSection
            id="challenges"
            number="06"
            title={text(
              "Thách thức kỹ thuật",
              "Technical challenges",
              language,
            )}
          >
            {study.challenges.length ? (
              <div className="case-challenges">
                {study.challenges.map((challenge) => (
                  <article key={challenge.title.en}>
                    <h3>{challenge.title[language]}</h3>
                    <p>{challenge.approach[language]}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="case-missing">
                {text(
                  "Nguồn hiện có ghi nhận nhiệm vụ và công nghệ, nhưng chưa có mô tả chi tiết thách thức kỹ thuật. Nội dung này sẽ được bổ sung khi có thông tin xác thực.",
                  "Available sources describe responsibilities and technologies, but do not document detailed technical challenges. This section awaits verified information.",
                  language,
                )}
              </p>
            )}
            {project.notes?.map((note) => (
              <p className="project-note" key={note.en}>
                {note[language]}
              </p>
            ))}
          </CaseSection>
          <CaseSection
            id="screenshots"
            number="07"
            title={text("Giao diện thực tế", "Actual screenshots", language)}
          >
            {project.screenshot ? (
              <ProjectScreenshot project={project} />
            ) : (
              <p className="case-missing">
                {text(
                  "Chưa có screenshot thực tế được bổ sung cho dự án này.",
                  "No actual screenshots have been provided for this project yet.",
                  language,
                )}
              </p>
            )}
          </CaseSection>
          <div className="case-next">
            <span>{text("DỰ ÁN TIẾP THEO", "NEXT PROJECT", language)}</span>
            <a href={projectUrl(next)}>
              {next.name} <span aria-hidden="true">↗</span>
            </a>
            <a href="/projects/">
              {text("Xem tất cả dự án", "All projects", language)} →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
