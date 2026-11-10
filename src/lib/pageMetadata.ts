import { projects } from "../data/projects.ts";
import type { PortfolioRoute } from "./routes";
export function pageMetadata(route: PortfolioRoute, language: "vi" | "en") {
  if (route.kind === "case-study") {
    const project = projects.find((project) => project.slug === route.slug)!;
    return {
      title: `${project.name} — Case Study | Tran Minh Chien`,
      description: project.summary[language],
      robots: "index,follow",
    };
  }
  if (route.kind === "not-found")
    return {
      title:
        language === "vi"
          ? "Không tìm thấy trang | Tran Minh Chien"
          : "Page not found | Tran Minh Chien",
      description:
        language === "vi"
          ? "Trang được yêu cầu không tồn tại."
          : "The requested page does not exist.",
      robots: "noindex,follow",
    };
  if (route.kind === "projects")
    return {
      title:
        language === "vi"
          ? "Dự án | Tran Minh Chien — Software Engineer"
          : "Projects | Tran Minh Chien — Software Engineer",
      description:
        language === "vi"
          ? "Các dự án backend và fullstack của Tran Minh Chien: thương mại điện tử, tài liệu, thanh toán và xử lý video."
          : "Explore backend and fullstack projects by Tran Minh Chien: commerce, documents, payments, and video processing.",
      robots: "index,follow",
    };
  return {
    title: "Tran Minh Chien — Software Engineer",
    description:
      language === "vi"
        ? "Software Engineer với 4 năm kinh nghiệm ứng dụng web doanh nghiệp, REST API và fullstack với PHP/Laravel, NestJS và React."
        : "Software Engineer with 4 years building enterprise web applications, REST APIs, and fullstack solutions with PHP/Laravel, NestJS, and React.",
    robots: "index,follow",
  };
}
