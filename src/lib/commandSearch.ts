import { projects, projectUrl } from "../data/projects.ts";
import { caseStudies } from "../data/caseStudies.ts";
import { normalizeSearch, projectTechnologies } from "./projectFilters.ts";
export interface CommandItem {
  id: string;
  kind: "project" | "technology" | "section";
  label: { vi: string; en: string };
  detail: { vi: string; en: string };
  href: string;
  keywords: string;
}
const sections = [
  ["home", "Trang chủ", "Home"],
  ["about", "Giới thiệu", "About"],
  ["exp", "Kinh nghiệm", "Career journey"],
  ["skills", "Kỹ năng", "Skills"],
  ["projects", "Dự án nổi bật", "Featured projects"],
  ["education", "Học vấn", "Education"],
  ["contact", "Liên hệ", "Contact"],
];
export function commandItems(): CommandItem[] {
  const archiveTechnologies = projectTechnologies(projects);
  const allTechnologies = [
    ...new Set([
      ...archiveTechnologies,
      ...projects.flatMap(
        (project) => caseStudies[project.slug]?.implementationStack ?? [],
      ),
    ]),
  ].sort((a, b) => a.localeCompare(b));
  return [
    ...sections.map(([id, vi, en]): CommandItem => ({
      id: `section-${id}`,
      kind: "section",
      label: { vi, en },
      detail: { vi: "Đi đến mục", en: "Jump to section" },
      href: `/#${id}`,
      keywords: `${vi} ${en} section ${id}`,
    })),
    {
      id: "section-all-projects",
      kind: "section",
      label: { vi: "Tất cả dự án", en: "All projects" },
      detail: { vi: "Tìm kiếm và bộ lọc", en: "Search and filters" },
      href: "/projects/",
      keywords: "projects archive danh sach du an",
    },
    ...projects.map((project): CommandItem => ({
      id: `project-${project.slug}`,
      kind: "project",
      label: { vi: project.name, en: project.name },
      detail: project.subtitle,
      href: projectUrl(project),
      keywords: [
        project.summary.vi,
        project.summary.en,
        ...project.technologies,
        ...(caseStudies[project.slug]?.implementationStack ?? []),
      ].join(" "),
    })),
    ...allTechnologies.map((technology): CommandItem => {
      const owner = projects.find((project) =>
        caseStudies[project.slug]?.implementationStack?.includes(technology),
      );
      const href = archiveTechnologies.includes(technology)
        ? `/projects/?tech=${encodeURIComponent(technology)}`
        : `${projectUrl(owner!)}#stack`;
      return {
        id: `technology-${technology}`,
        kind: "technology",
        label: { vi: technology, en: technology },
        detail: {
          vi: archiveTechnologies.includes(technology)
            ? "Khám phá dự án dùng công nghệ này"
            : `${owner!.name} · source hiện tại`,
          en: archiveTechnologies.includes(technology)
            ? "Explore projects using this technology"
            : `${owner!.name} · current source`,
        },
        href,
        keywords: `technology cong nghe stack ${technology}`,
      };
    }),
  ];
}
export function searchCommands(
  items: CommandItem[],
  query: string,
): CommandItem[] {
  const words = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return items
    .filter((item) => {
      const content = normalizeSearch(
        `${item.label.vi} ${item.label.en} ${item.detail.vi} ${item.detail.en} ${item.keywords}`,
      );
      return words.every((word) => content.includes(word));
    })
    .sort((a, b) => {
      if (!query.trim()) return 0;
      const exactA =
        normalizeSearch(a.label.en) === normalizeSearch(query) ? 1 : 0;
      const exactB =
        normalizeSearch(b.label.en) === normalizeSearch(query) ? 1 : 0;
      return exactB - exactA;
    })
    .slice(0, 24);
}
