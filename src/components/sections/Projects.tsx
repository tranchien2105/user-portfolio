import { featuredProjects, projects } from "../../data/projects";
import { text, useLanguage } from "../../hooks/useLanguage";
import { ProjectEntry } from "../projects/ProjectEntry";
import { SectionHeading } from "../ui/SectionHeading";
export default function Projects() {
  const { language } = useLanguage();
  return (
    <section className="section" id="projects">
      <div className="projects-section-header">
        <SectionHeading
          number="04"
          label="FEATURED PROJECTS"
          title={{ vi: "Một vài dự án nổi bật", en: "Featured projects" }}
        />
        <a className="archive-link" href="/projects/">
          {text("Tất cả dự án", "All projects", language)}{" "}
          <span>{String(projects.length).padStart(2, "0")} ↗</span>
        </a>
      </div>
      <p className="section-description">
        {text(
          "Những góc nhìn về phát triển sản phẩm: thương mại điện tử, phối hợp công việc và xử lý tài liệu.",
          "Perspectives on building products: commerce, team collaboration, and document workflows.",
          language,
        )}
      </p>
      <div className="projects-list featured-list">
        {featuredProjects.map((project, index) => (
          <ProjectEntry
            project={project}
            index={index}
            featured
            lead={index === 0}
            key={project.slug}
          />
        ))}
      </div>
      <div className="projects-archive-cta">
        <p>
          {text(
            "Còn có API thanh toán, xử lý video, hệ thống doanh nghiệp và quản lý portfolio.",
            "Also explore payment APIs, video processing, enterprise systems, and portfolio management.",
            language,
          )}
        </p>
        <a className="button button-secondary" href="/projects/">
          {text("Khám phá toàn bộ dự án", "Browse all projects", language)}{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
