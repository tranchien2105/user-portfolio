import { useEffect } from "react";
import { useLanguage } from "./useLanguage";
export function usePageMetadata(projectsPage: boolean) {
  const { language } = useLanguage();
  useEffect(() => {
    const title = projectsPage
      ? language === "vi"
        ? "Dự án | Tran Minh Chien — Software Engineer"
        : "Projects | Tran Minh Chien — Software Engineer"
      : "Tran Minh Chien — Software Engineer";
    const description = projectsPage
      ? language === "vi"
        ? "Khám phá dự án phần mềm của Tran Minh Chien: thương mại điện tử, quản lý công việc, tài liệu, thanh toán và xử lý video. Tìm kiếm theo lĩnh vực và công nghệ."
        : "Explore software projects by Tran Minh Chien: commerce, task management, documents, payments, and video processing. Search by discipline and technology."
      : language === "vi"
        ? "Tran Minh Chien — Software Engineer với 4 năm kinh nghiệm ứng dụng web doanh nghiệp, REST API và giải pháp fullstack với PHP/Laravel, NestJS và React."
        : "Tran Minh Chien — Software Engineer with 4 years building enterprise web applications, REST APIs and fullstack solutions with PHP/Laravel, NestJS and React.";
    document.title = title;
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
    ])
      document.querySelector(selector)?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
  }, [language, projectsPage]);
}
