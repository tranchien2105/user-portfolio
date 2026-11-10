// Primary source: docs/Tran-Minh-Chien-SortWareEngineer.pdf
import type {
  EducationItem,
  ExperienceItem,
  Localized,
  Profile,
  SkillGroup,
} from "../types/portfolio";
const l = (vi: string, en: string): Localized => ({ vi, en });
export const profile: Profile = {
  name: "Tran Minh Chien",
  title: "Software Engineer",
  yearsExperience: 4,
  location: "District 3, Ho Chi Minh City, Vietnam",
  email: "tranchien021@gmail.com",
  phone: "0349521656",
  github: "https://github.com/tranchien2105",
  cv: `${import.meta.env.BASE_URL}Tran-Minh-Chien-SortWareEngineer.pdf`,
  summary: l(
    "Kỹ sư phần mềm với 4 năm kinh nghiệm xây dựng ứng dụng web doanh nghiệp, RESTful API và giải pháp fullstack. Kinh nghiệm thực tế với PHP/Laravel; phát triển thêm chuyên môn TypeScript, NestJS, React và Next.js qua các dự án cá nhân.",
    "Software Engineer with 4 years of experience developing enterprise web applications, RESTful APIs, and fullstack solutions. Experienced in PHP/Laravel and expanding expertise in TypeScript, NestJS, React, and Next.js through personal projects.",
  ),
};

export const interests = [
  l("AI hỗ trợ phát triển phần mềm", "AI tools for development"),
  l(
    "Công nghệ backend & thiết kế hệ thống",
    "Backend technologies & system design",
  ),
  l("Cộng đồng mã nguồn mở", "Open-source communities"),
];
export const careerHighlights = [
  {
    id: "backend" as const,
    title: l("Backend Development", "Backend Development"),
    detail: l(
      "PHP/Laravel, xác thực và xử lý nghiệp vụ cho ứng dụng web doanh nghiệp.",
      "PHP/Laravel, authentication, and business logic for enterprise web applications.",
    ),
    evidence: l("FinViet & Software Shinway", "FinViet & Software Shinway"),
    href: "#exp",
  },
  {
    id: "database" as const,
    title: l("REST APIs & Hệ thống", "REST APIs & Systems"),
    detail: l(
      "Thiết kế API, đồng bộ dữ liệu và tối ưu truy vấn PostgreSQL/MySQL trong hệ thống DMS.",
      "API design, data synchronization, and PostgreSQL/MySQL query optimization in a DMS platform.",
    ),
    evidence: l("DMS · Backend Developer", "DMS · Backend Developer"),
    href: "/projects/#dms-system",
  },
  {
    id: "frontend" as const,
    title: l("Fullstack qua dự án", "Fullstack through projects"),
    detail: l(
      "Mở rộng từ API NestJS đến giao diện React/Next.js qua các sản phẩm cá nhân.",
      "Extending NestJS APIs into React/Next.js interfaces through personal products.",
    ),
    evidence: l(
      "Technest, TaskFlow & Papertrail",
      "Technest, TaskFlow & Papertrail",
    ),
    href: "/projects/?category=Fullstack",
  },
];

export const skills: SkillGroup[] = [
  {
    id: "backend",
    title: l("Backend Engineering", "Backend Engineering"),
    description: l(
      "API, phân quyền và xử lý nghiệp vụ — trọng tâm trong công việc của mình.",
      "APIs, authorization, and business logic — the core of my professional work.",
    ),
    skills: [
      "PHP",
      "Laravel",
      "Apiato",
      "Yii",
      "Node.js",
      "NestJS",
      "REST APIs",
      "Authentication",
      "RBAC",
      "Queues",
    ],
    supportingSkills: [
      "JWT",
      "Sanctum",
      "Passport",
      "Socket.IO",
      "Jobs & Events",
    ],
    note: l(
      "PHP/Laravel trong hệ thống doanh nghiệp; tiếp tục phát triển Node.js/NestJS qua dự án cá nhân.",
      "PHP/Laravel in enterprise systems; further developing Node.js/NestJS through personal projects.",
    ),
  },
  {
    id: "frontend",
    title: l("Frontend Development", "Frontend Development"),
    description: l(
      "Giao diện web kết nối với API, từ quản lý công việc đến thương mại điện tử.",
      "API-connected web interfaces, from task management to e-commerce.",
    ),
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Vue.js"],
    note: l(
      "JavaScript/Vue.js trong công việc; React/Next.js và TypeScript được phát triển thêm qua dự án.",
      "JavaScript/Vue.js in professional work; React/Next.js and TypeScript developed further through projects.",
    ),
  },
  {
    id: "database",
    title: l("Database & Caching", "Database & Caching"),
    description: l(
      "Thiết kế dữ liệu, tối ưu truy vấn và cache cho các luồng xử lý backend.",
      "Data modeling, query optimization, and caching for backend workflows.",
    ),
    skills: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Database Design",
      "Query Optimization",
    ],
    supportingSkills: ["Elasticsearch"],
    note: l(
      "PostgreSQL/MySQL trong hệ thống thực tế. Elasticsearch được thực hành trong personal lab.",
      "PostgreSQL/MySQL in real systems. Elasticsearch experience comes from a personal lab.",
    ),
  },
  {
    id: "infrastructure",
    title: l("DevOps & Infrastructure", "DevOps & Infrastructure"),
    description: l(
      "Môi trường chạy nhất quán, reverse proxy và tự động hóa kiểm tra mã nguồn.",
      "Consistent environments, reverse proxies, and automated code checks.",
    ),
    skills: [
      "Docker",
      "Docker Compose",
      "Linux",
      "Nginx",
      "GitHub Actions",
      "Git",
    ],
    supportingSkills: ["Postman"],
    note: l(
      "Docker/Nginx để triển khai Technest lên VPS; GitHub Actions trong quy trình TaskFlow.",
      "Docker/Nginx for Technest’s VPS deployment; GitHub Actions in TaskFlow’s workflow.",
    ),
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "FinViet",
    position: "Software Engineer",
    period: "08/2024 — 12/2025",
    technologies: [
      "PHP",
      "Laravel",
      "Apiato",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Postman",
    ],
    description: [
      l(
        "Phát triển hệ thống backend và API cho nền tảng DMS; triển khai và duy trì tính năng theo yêu cầu khách hàng.",
        "Developed enterprise backend systems and APIs for DMS platforms; implemented and maintained features based on customer requirements.",
      ),
      l(
        "Thiết kế, tối ưu truy vấn SQL và xử lý backend. Làm việc với kiến trúc module, kiểm thử API, debugging và tích hợp hệ thống.",
        "Designed and optimized SQL queries and backend processing. Worked with modular architecture, API testing, debugging, and system integration.",
      ),
    ],
  },
  {
    company: "Software Shinway",
    position: "Software Engineer",
    period: "03/2022 — 07/2024",
    technologies: [
      "PHP",
      "Laravel",
      "Yii",
      "PostgreSQL",
      "MySQL",
      "Vue.js",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    description: [
      l(
        "Phát triển, bảo trì tính năng backend theo nghiệp vụ; xây dựng và tùy chỉnh hệ thống xuất PDF/Excel.",
        "Developed and maintained backend features; built and customized PDF/Excel export systems.",
      ),
      l(
        "Cải tiến module và quy trình xử lý ứng dụng; phối hợp với nhóm để duy trì code dễ bảo trì và mở rộng.",
        "Improved existing modules and application workflows; collaborated with the team to maintain scalable, maintainable codebases.",
      ),
    ],
  },
];
export const education: EducationItem[] = [
  {
    institution: l(
      "Trường Đại học Công nghệ Thông tin (UIT), ĐHQG TP.HCM",
      "University of Information Technology (UIT), VNU-HCM",
    ),
    degree: l(
      "Cử nhân Mạng máy tính và Truyền thông",
      "Bachelor of Computer Networks and Communications",
    ),
    period: "09/2018 — 11/2023",
    description: l("Tốt nghiệp tháng 11/2023", "Graduated in November 2023"),
  },
];
