import { featuredProjects, projects } from "../../data/projects";
import { text, useLanguage } from "../../hooks/useLanguage";
import { ProjectEntry } from "../projects/ProjectEntry";
import { ProjectPreview } from "../projects/ProjectPreview";
import { SectionHeading } from "../ui/SectionHeading";

const leadProject = featuredProjects[0];
const supportingProjects = projects.filter((project) =>
  ["taskflow", "papertrail"].includes(project.slug),
);
const selectedSlugs = new Set([
  leadProject.slug,
  ...supportingProjects.map((project) => project.slug),
]);
const otherProjects = projects.filter(
  (project) => !selectedSlugs.has(project.slug),
);

export default function Projects() {
  const { language } = useLanguage();
  return (
    <section className="section projects-section" id="projects">
      <div className="work-section-heading">
        <SectionHeading
          title={{
            vi: "Dự án & bài toán kỹ thuật",
            en: "Projects & engineering problems",
          }}
        />
        <a className="archive-link" href="/projects/">
          {text("Kho dự án", "Project archive", language)}
        </a>
      </div>
      <p className="section-description">
        {text(
          "Ba bài toán mình đã triển khai: luồng thương mại điện tử, phân quyền theo dự án và tạo tài liệu từ mẫu Office. Mỗi dự án bên dưới có ngữ cảnh, phần triển khai và các quyết định kỹ thuật cụ thể.",
          "Three problems I’ve worked on: commerce workflows, project-scoped authorization, and document generation from Office templates. Each includes its context, implementation, and specific engineering decisions.",
          language,
        )}
      </p>
      <ProjectEntry project={leadProject} featured lead />
      <div className="supporting-projects">
        {supportingProjects.map((project) => (
          <ProjectPreview project={project} key={project.slug} />
        ))}
      </div>
      <h3 className="other-projects-title">
        {text(
          "Những hệ thống & bài toán khác",
          "More systems & engineering work",
          language,
        )}
      </h3>
      <div className="compact-project-list">
        {otherProjects.map((project) => (
          <ProjectEntry project={project} featured key={project.slug} />
        ))}
      </div>
      <a className="archive-link" href="/projects/">
        {text(
          "Tìm kiếm và lọc tất cả dự án",
          "Search and filter all projects",
          language,
        )}
      </a>
    </section>
  );
}
