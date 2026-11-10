import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import {
  categories,
  defaultFilters,
  filterProjects,
  projectTechnologies,
  readProjectFilters,
  type ProjectFilters,
} from "../lib/projectFilters";
import { text, useLanguage } from "../hooks/useLanguage";
import { ProjectEntry } from "../components/projects/ProjectEntry";
const technologies = projectTechnologies(projects);
export default function ProjectsPage() {
  const { language } = useLanguage();
  const searchRef = useRef<HTMLInputElement>(null);
  const [filters, setFilters] = useState(() =>
    readProjectFilters(window.location.search, technologies),
  );
  const visibleProjects = filterProjects(projects, filters);
  const isFiltered =
    filters.query !== "" ||
    filters.category !== "all" ||
    filters.technology !== "all";
  useEffect(() => {
    const url = new URL(window.location.href);
    for (const [key, value] of [
      ["q", filters.query],
      ["category", filters.category],
      ["tech", filters.technology],
    ]) {
      if (value && value !== "all") url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    window.history.replaceState(null, "", url);
  }, [filters]);
  useEffect(() => {
    const update = () =>
      setFilters(readProjectFilters(window.location.search, technologies));
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  useEffect(() => {
    let frame = 0;
    const revealProject = () => {
      const id = window.location.hash.slice(1);
      if (!projects.some((project) => project.slug === id)) return;
      const article = document.getElementById(id);
      const details = article?.querySelector("details");
      if (details) details.open = true;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => article?.scrollIntoView());
    };
    revealProject();
    window.addEventListener("hashchange", revealProject);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", revealProject);
    };
  }, []);
  function resetFilters() {
    setFilters(defaultFilters);
    searchRef.current?.focus();
  }
  function changeFilters(next: Partial<ProjectFilters>) {
    setFilters((current) => ({ ...current, ...next }));
  }
  return (
    <div className="projects-page">
      <header className="projects-page-heading">
        <a className="projects-back-link" href="/">
          ← {text("Trang chủ", "Home", language)}
        </a>
        <p className="eyebrow">
          PROJECT ARCHIVE / {String(projects.length).padStart(2, "0")} ENTRIES
        </p>
        <div className="archive-heading-row">
          <h1>
            {text("Từ ý tưởng", "From ideas", language)}
            <br />
            <span>{text("đến phần mềm.", "to software.", language)}</span>
          </h1>
          <p>
            {text(
              "Những sản phẩm và bài toán mình đã làm: từ giao diện, API và dữ liệu đến tác vụ nền, tích hợp và triển khai.",
              "Products and problems I have worked on, from interfaces, APIs, and data to background jobs, integrations, and deployment.",
              language,
            )}
          </p>
        </div>
      </header>
      <section
        className="project-filters"
        aria-label={text(
          "Tìm kiếm và lọc dự án",
          "Search and filter projects",
          language,
        )}
      >
        <div className="filter-inputs">
          <div className="filter-field search-field">
            <label htmlFor="project-search">
              {text("Tìm dự án", "Search projects", language)}
            </label>
            <input
              id="project-search"
              ref={searchRef}
              type="search"
              value={filters.query}
              onChange={(event) => changeFilters({ query: event.target.value })}
              placeholder={text(
                "Tên, bài toán, công nghệ…",
                "Name, problem, technology…",
                language,
              )}
              aria-controls="project-results"
            />
          </div>
          <div className="filter-field">
            <label htmlFor="project-technology">
              {text("Công nghệ", "Technology", language)}
            </label>
            <select
              id="project-technology"
              value={filters.technology}
              onChange={(event) =>
                changeFilters({ technology: event.target.value })
              }
              aria-controls="project-results"
            >
              <option value="all">
                {text("Tất cả công nghệ", "All technologies", language)}
              </option>
              {technologies.map((tech) => (
                <option value={tech} key={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className="category-filters"
          role="group"
          aria-label={text(
            "Lọc theo lĩnh vực",
            "Filter by discipline",
            language,
          )}
        >
          <button
            type="button"
            aria-pressed={filters.category === "all"}
            onClick={() => changeFilters({ category: "all" })}
          >
            {text("Tất cả", "All", language)} <span>{projects.length}</span>
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={filters.category === category}
              onClick={() => changeFilters({ category })}
            >
              {category}{" "}
              <span>
                {
                  projects.filter((project) => project.category === category)
                    .length
                }
              </span>
            </button>
          ))}
        </div>
      </section>
      <div className="results-toolbar">
        <p role="status" aria-live="polite" aria-atomic="true">
          {visibleProjects.length} / {projects.length}{" "}
          {text("dự án", "projects", language)}
        </p>
        {isFiltered && (
          <button type="button" onClick={resetFilters}>
            {text("Xóa bộ lọc", "Clear filters", language)} ×
          </button>
        )}
      </div>
      <section
        className="projects-list archive-list"
        id="project-results"
        aria-label={text("Danh sách dự án", "Project results", language)}
      >
        {visibleProjects.map((project) => (
          <ProjectEntry
            project={project}
            index={projects.indexOf(project)}
            key={project.slug}
          />
        ))}
        {visibleProjects.length === 0 && (
          <div className="project-empty">
            <h2>
              {text(
                "Chưa tìm thấy dự án phù hợp",
                "No matching projects",
                language,
              )}
            </h2>
            <p>
              {filters.category === "Frontend"
                ? text(
                    "Hiện chưa có dự án Frontend độc lập được ghi nhận. Các dự án Fullstack có phần giao diện và API.",
                    "No standalone Frontend projects are documented yet. Fullstack projects include both interfaces and APIs.",
                    language,
                  )
                : text(
                    "Thử một từ khóa khác hoặc bỏ bớt điều kiện lọc.",
                    "Try another keyword or remove a filter.",
                    language,
                  )}
            </p>
            <button
              className="button button-secondary"
              type="button"
              onClick={resetFilters}
            >
              {text("Hiển thị tất cả dự án", "Show all projects", language)}
            </button>
          </div>
        )}
      </section>
      <aside className="archive-contact">
        <p>
          {text(
            "Muốn trao đổi sâu hơn về cách triển khai?",
            "Want to talk about the implementation?",
            language,
          )}
        </p>
        <a href="/#contact">
          {text("Kết nối với mình", "Let’s connect", language)} ↗
        </a>
      </aside>
    </div>
  );
}
