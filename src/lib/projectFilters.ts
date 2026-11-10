import type { ProjectCategory, ProjectItem } from "../types/portfolio";
export const categories = ["Backend", "Fullstack", "Frontend"] as const;
export interface ProjectFilters {
  query: string;
  category: ProjectCategory | "all";
  technology: string;
}
export const defaultFilters: ProjectFilters = {
  query: "",
  category: "all",
  technology: "all",
};
export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}
export function technologyFamily(technology: string): string {
  return technology.replace(/\s+\d[\d.]*$/, "");
}
export function projectTechnologies(items: ProjectItem[]): string[] {
  return [
    ...new Set(
      items.flatMap((project) => project.technologies.map(technologyFamily)),
    ),
  ].sort((a, b) => a.localeCompare(b));
}
export function filterProjects(
  items: ProjectItem[],
  filters: ProjectFilters,
): ProjectItem[] {
  const words = normalizeSearch(filters.query).split(/\s+/).filter(Boolean);
  return items.filter((project) => {
    if (filters.category !== "all" && project.category !== filters.category)
      return false;
    if (
      filters.technology !== "all" &&
      !project.technologies.some(
        (tech) => technologyFamily(tech) === filters.technology,
      )
    )
      return false;
    const content = normalizeSearch(
      [
        project.name,
        project.subtitle.vi,
        project.subtitle.en,
        project.summary.vi,
        project.summary.en,
        project.problem.vi,
        project.problem.en,
        project.role ?? "",
        project.category,
        ...project.technologies,
        ...project.contributions.flatMap((line) => [line.vi, line.en]),
      ].join(" "),
    );
    return words.every((word) => content.includes(word));
  });
}
export function readProjectFilters(
  search: string,
  technologies: string[],
): ProjectFilters {
  const params = new URLSearchParams(search);
  const category = params.get("category");
  const technology = params.get("tech");
  return {
    query: params.get("q") ?? "",
    category: categories.find((item) => item === category) ?? "all",
    technology:
      technology && technologies.includes(technology) ? technology : "all",
  };
}
