import { text, useLanguage } from "../../hooks/useLanguage";
import type { ProjectItem } from "../../types/portfolio";
export function ProjectLinks({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  return (
    <div className="project-links">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} GitHub`}
        >
          GitHub ↗
        </a>
      )}
      {project.live && project.liveStatus !== "unavailable" && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} Live Demo`}
        >
          Live Demo ↗
        </a>
      )}
      {project.liveStatus === "unavailable" && (
        <span className="project-link-status">
          {text(
            "Website hiện chưa truy cập được",
            "Website currently unavailable",
            language,
          )}
        </span>
      )}
      {!project.github && !project.live && (
        <span className="project-link-status">
          {text(
            "Chưa có liên kết công khai",
            "No public links provided",
            language,
          )}
        </span>
      )}
    </div>
  );
}
