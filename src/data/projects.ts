import type { Localized, ProjectItem } from "../types/portfolio";
const l = (vi: string, en: string): Localized => ({ vi, en });
// CV projects are retained verbatim; additional projects are grounded in local source.
export const projects: ProjectItem[] = [
  {
    name: "Technest",
    slug: "technest",
    category: "Fullstack",
    featured: true,
    subtitle: l("E-commerce Platform", "E-commerce Platform"),
    problem: l(
      "Kết nối danh mục, tồn kho, giỏ hàng và xử lý đơn hàng trong một luồng mua sắm; kiểm soát đồng thời khi chạy Flash Sale.",
      "Connect catalog, inventory, cart, and order processing in one shopping flow, including concurrency control during Flash Sales.",
    ),
    screenshot: {
      src: "/projects/screenshots/technest.png",
      width: 1440,
      height: 900,
      alt: l(
        "Giao diện Technest với danh mục và sản phẩm nổi bật",
        "Technest storefront with categories and featured products",
      ),
      caption: l(
        "Screenshot từ bản triển khai Technest · 05/11/2026",
        "Screenshot of the Technest deployment · 5 November 2026",
      ),
    },
    sources: [
      "docs/Tran-Minh-Chien-SortWareEngineer.pdf",
      "../technest/docs/deployments/2026-11-05/inset-correction/1440-top.png",
    ],
    role: "Full Stack Developer",
    period: "10/2026 — Present",
    kind: l("Dự án cá nhân · E-commerce", "Personal project · E-commerce"),
    summary: l(
      "Nền tảng thương mại điện tử với quản lý sản phẩm, giỏ hàng, thanh toán, xử lý đơn hàng, Flash Sale và trang quản trị.",
      "Fullstack e-commerce platform with product management, shopping cart, checkout, order processing, Flash Sales, and an admin dashboard.",
    ),
    contributions: [
      l(
        "Xây dựng REST API bằng NestJS và giao diện responsive bằng React; xác thực JWT và phân quyền RBAC.",
        "Built NestJS REST APIs and responsive React interfaces with JWT authentication and role-based access control.",
      ),
      l(
        "Xử lý đơn hàng, tồn kho và Flash Sale có kiểm soát đồng thời; tích hợp Redis, email và tác vụ nền.",
        "Implemented orders, inventory, and Flash Sale workflows with concurrency control; integrated Redis, email, and background processing.",
      ),
      l(
        "Triển khai lên VPS với Docker và Nginx.",
        "Deployed to a VPS using Docker and Nginx.",
      ),
    ],
    technologies: [
      "NestJS",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Nginx",
    ],
    github: "https://github.com/tranchien2105/Technest",
    live: "https://technest-dev.duckdns.org/",
  },
  {
    name: "TaskFlow",
    slug: "taskflow",
    flow: ["JWT authentication", "Project membership", "Tasks & Socket.IO"],
    category: "Fullstack",
    featured: true,
    subtitle: l("Project & Task Management", "Project & Task Management"),
    problem: l(
      "Tổ chức công việc nhóm theo dự án và đảm bảo mỗi thành viên chỉ truy cập tài nguyên được cấp quyền, đồng thời nhận thông báo khi có thay đổi.",
      "Organize team work by project, enforce membership-based access to resources, and notify users when work changes.",
    ),
    sources: ["docs/Tran-Minh-Chien-SortWareEngineer.pdf"],
    role: "Full Stack Developer",
    period: "05/2026 — 10/2026",
    kind: l(
      "Dự án cá nhân · Quản lý công việc",
      "Personal project · Task management",
    ),
    summary: l(
      "Ứng dụng quản lý dự án và công việc theo mô hình Jira/Trello, với phân quyền theo dự án và thông báo realtime.",
      "Jira/Trello-style project and task management with project-level authorization and realtime notifications.",
    ),
    contributions: [
      l(
        "JWT, vai trò Manager/Member và kiểm tra thành viên trên từng tài nguyên; quản lý lời mời, người phụ trách, trạng thái và deadline.",
        "Implemented JWT, Manager/Member roles, and membership checks on every resource; built invitations, assignments, statuses, and deadlines.",
      ),
      l(
        "Thông báo Socket.IO theo phòng người dùng; cache Redis, TypeORM migrations, Docker và GitHub Actions.",
        "Delivered Socket.IO notifications through per-user rooms; added Redis caching, TypeORM migrations, Docker, and GitHub Actions.",
      ),
    ],
    technologies: [
      "NestJS 11",
      "TypeORM",
      "PostgreSQL 16",
      "Redis 7",
      "Socket.IO",
      "Next.js 16",
      "React 19",
      "Docker",
      "GitHub Actions",
    ],
    github: "https://github.com/tranchien2105/taskflow",
  },
  {
    name: "DMS System",
    slug: "dms-system",
    category: "Backend",
    featured: false,
    subtitle: l(
      "Distributor Management System",
      "Distributor Management System",
    ),
    problem: l(
      "Đồng bộ dữ liệu nhà phân phối và hỗ trợ quy trình vận hành nội bộ, báo cáo và trao đổi dữ liệu giữa các hệ thống.",
      "Synchronize distributor data and support internal operations, reporting, and data exchange across systems.",
    ),
    notes: [
      l(
        "Website được ghi trong CV; lần kiểm tra ngày 10/11/2026 trả về HTTP 404.",
        "The website listed in the CV returned HTTP 404 when checked on 10 November 2026.",
      ),
    ],
    sources: ["docs/Tran-Minh-Chien-SortWareEngineer.pdf"],
    role: "Backend Developer",
    period: "08/2024 — 11/2025",
    kind: l("FinViet · Nhóm 12 người", "FinViet · Team of 12"),
    summary: l(
      "Hệ thống quản lý nhà phân phối phục vụ đội ngũ nội bộ và hoạt động kinh doanh của doanh nghiệp.",
      "Enterprise distributor management platform supporting internal teams and business operations.",
    ),
    contributions: [
      l(
        "Phát triển REST API và Cluster API đồng bộ dữ liệu; tối ưu truy vấn và xử lý backend.",
        "Developed REST APIs and Cluster APIs for data synchronization; optimized queries and backend processing.",
      ),
      l(
        "Xây dựng import/export Excel, PDF; phối hợp tích hợp frontend và sử dụng AI hỗ trợ debugging, tài liệu.",
        "Built Excel/PDF import and export modules; collaborated on frontend integration and used AI tools for debugging and documentation.",
      ),
    ],
    technologies: ["PHP 8.2", "Apiato", "Nginx", "PostgreSQL"],
    live: "https://eco-dms-dev.finviet.com.vn/",
    liveStatus: "unavailable",
  },
  {
    name: "VTech",
    slug: "vtech",
    category: "Fullstack",
    featured: false,
    subtitle: l("Electronics E-commerce", "Electronics E-commerce"),
    problem: l(
      "Đưa danh mục sản phẩm điện tử và các quy trình quản lý bán hàng lên một website thương mại điện tử.",
      "Bring an electronics catalog and sales management workflows into an e-commerce website.",
    ),
    sources: ["docs/Tran-Minh-Chien-SortWareEngineer.pdf"],
    role: "Full Stack Developer",
    period: "11/2022 — 07/2024",
    kind: l("E-commerce · Nhóm 6 người", "E-commerce · Team of 6"),
    summary: l(
      "Website thương mại điện tử cho sản phẩm điện tử, hỗ trợ quản lý sản phẩm và vận hành bán hàng.",
      "Electronics e-commerce website with product management and sales operations.",
    ),
    contributions: [
      l(
        "Xây dựng tính năng từ đầu; phát triển các module backend và frontend cho quản lý sản phẩm và bán hàng.",
        "Built features from scratch and developed backend and frontend modules for product management and sales operations.",
      ),
    ],
    technologies: [
      "PHP 8.0",
      "Laravel 8",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Ajax",
    ],
    live: "https://vtechsolutions.vn/",
  },
  {
    slug: "papertrail",
    screenshot: {
      src: "/projects/screenshots/papertrail.png",
      width: 1440,
      height: 1000,
      alt: l(
        "Giao diện thư viện mẫu tài liệu Papertrail",
        "Papertrail document template library",
      ),
      caption: l(
        "Giao diện demo Papertrail · chụp ngày 10/11/2026",
        "Papertrail live demo · captured 10 November 2026",
      ),
    },
    name: "Papertrail",
    category: "Fullstack",
    featured: true,
    subtitle: l("Document Template Library", "Document Template Library"),
    kind: l("Dự án cá nhân · Tài liệu", "Personal project · Documents"),
    summary: l(
      "Thư viện mẫu Word/PowerPoint: tìm kiếm, xem trước, điền nội dung và tải tài liệu DOCX/PPTX đã tạo.",
      "A Word/PowerPoint template library for searching, previewing, filling, and downloading generated DOCX/PPTX documents.",
    ),
    problem: l(
      "Giảm thao tác lặp khi tạo báo cáo và bài thuyết trình từ mẫu; giữ nguyên file nguồn và cho phép tìm lại tài liệu đã tạo.",
      "Reduce repetitive work when producing reports and presentations from templates, preserve source files, and keep generated documents available for reuse.",
    ),
    contributions: [
      l(
        "Xây dựng thư viện, xem trước và biểu mẫu tạo tài liệu bằng Next.js; API quản lý mẫu và lịch sử bằng NestJS.",
        "Implemented the library, previews, and document forms in Next.js, with NestJS APIs for template management and document history.",
      ),
      l(
        "Xử lý Office Open XML bằng JSZip, thay placeholder và tạo file đầu ra độc lập; kiểm tra cấu trúc gói Office và đường dẫn lưu trữ.",
        "Processed Office Open XML with JSZip, replaced placeholders, and generated independent output files; validated Office packages and storage paths.",
      ),
      l(
        "Lưu metadata trong PostgreSQL qua TypeORM migrations; đóng gói Docker Compose và reverse proxy Caddy.",
        "Stored metadata in PostgreSQL with TypeORM migrations; provided Docker Compose packaging and a Caddy reverse proxy.",
      ),
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "JSZip",
      "Docker",
      "Caddy",
    ],
    github: "https://github.com/tranchien2105/document-template-library",
    live: "https://papertrail-dev.duckdns.org/",
    notes: [
      l(
        "Bản demo sử dụng chung một Demo User; chưa có đăng nhập hoặc dữ liệu riêng cho từng tài khoản.",
        "The demo uses a shared Demo User; authentication and per-account private data are not implemented.",
      ),
    ],
    sources: [
      "../document-template-library/README.md",
      "../document-template-library/backend/src/templates/template.service.ts",
      "../document-template-library/.git/config",
      "https://papertrail-dev.duckdns.org/ (screenshot captured 2026-11-10)",
    ],
  },
  {
    slug: "payflow",
    name: "PayFlow",
    category: "Backend",
    featured: false,
    subtitle: l("Payment Processing Demo", "Payment Processing Demo"),
    kind: l("Dự án cá nhân · Backend demo", "Personal project · Backend demo"),
    summary: l(
      "API demo quản lý đơn hàng và thanh toán, hỗ trợ mock callback và tích hợp MoMo Sandbox.",
      "An order and payment API demo with mock callbacks and a MoMo Sandbox integration.",
    ),
    problem: l(
      "Xử lý yêu cầu thanh toán và callback lặp mà không tạo giao dịch trùng hoặc chuyển trạng thái đơn hàng không hợp lệ.",
      "Handle repeated payment requests and callbacks without duplicate transactions or invalid order state transitions.",
    ),
    contributions: [
      l(
        "Triển khai idempotency key, ràng buộc duy nhất trong database và kiểm tra xung đột giữa đơn hàng/provider.",
        "Implemented idempotency keys, database uniqueness, and conflict checks across orders and providers.",
      ),
      l(
        "Dùng transaction và pessimistic write lock khi cập nhật thanh toán/đơn hàng; kiểm tra chữ ký và số tiền của MoMo IPN.",
        "Used transactions and pessimistic write locks for payment/order updates; verified MoMo IPN signatures and amounts.",
      ),
      l(
        "Quản lý schema qua TypeORM migrations và bổ sung kiểm thử payment service, chữ ký MoMo.",
        "Managed schemas through TypeORM migrations and added payment-service and MoMo-signature tests.",
      ),
    ],
    technologies: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "Docker Compose",
      "Vitest",
      "MoMo Sandbox",
    ],
    notes: [
      l(
        "Demo backend với MoMo Sandbox; không phải hệ thống xử lý thanh toán production.",
        "A backend demo using MoMo Sandbox, rather than a production payment service.",
      ),
    ],
    sources: [
      "../payflow/backend/src/payments/payments.service.ts",
      "../payflow/backend/src/payments/payments.controller.ts",
      "../payflow/backend/package.json",
      "../payflow/backend/README.md",
    ],
  },
  {
    slug: "subflow",
    name: "SubFlow",
    category: "Fullstack",
    featured: false,
    subtitle: l("Video Translation Platform", "Video Translation Platform"),
    kind: l("Dự án cá nhân · Video & AI", "Personal project · Video & AI"),
    summary: l(
      "Tải video tiếng Nhật, nhận diện lời thoại bằng Whisper, dịch sang tiếng Việt bằng Ollama và chỉnh sửa phụ đề trên web.",
      "Upload Japanese videos, transcribe speech with Whisper, translate to Vietnamese using Ollama, and edit subtitles on the web.",
    ),
    problem: l(
      "Kết nối nhận diện, dịch và biên tập phụ đề thành một quy trình có theo dõi tiến độ, xử lý nền và phục hồi khi thử lại.",
      "Connect transcription, translation, and subtitle editing in a workflow with progress tracking, background processing, and retry recovery.",
    ),
    contributions: [
      l(
        "Xây dựng giao diện Next.js và API NestJS cho upload, video streaming có HTTP Range, phụ đề và trạng thái công việc.",
        "Implemented Next.js interfaces and NestJS APIs for uploads, HTTP Range video streaming, subtitles, and job status.",
      ),
      l(
        "Kết nối BullMQ/Redis với FFmpeg, faster-whisper và Ollama; lưu checkpoint và bản dịch theo nhóm vào PostgreSQL.",
        "Connected BullMQ/Redis with FFmpeg, faster-whisper, and Ollama; persisted checkpoints and translation batches in PostgreSQL.",
      ),
    ],
    technologies: [
      "Next.js",
      "React",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "BullMQ",
      "Python",
      "faster-whisper",
      "FFmpeg",
      "Ollama",
    ],
    github: "https://github.com/tranchien2105/Subflow",
    notes: [
      l(
        "Luồng xử lý hiện hỗ trợ video upload, nhận diện tiếng Nhật và dịch sang tiếng Việt; xử lý video nhập qua URL chưa được hỗ trợ.",
        "The processing pipeline supports uploaded Japanese videos translated into Vietnamese; processing videos imported by URL is not supported yet.",
      ),
    ],
    sources: [
      "../subflow/README.md",
      "../subflow/apps/api/src/videos/video-processing.processor.ts",
      "../subflow/.git/config",
    ],
  },
  {
    slug: "teamflow",
    name: "TeamFlow",
    category: "Fullstack",
    featured: false,
    subtitle: l(
      "Profile & Portfolio Management",
      "Profile & Portfolio Management",
    ),
    kind: l("Dự án cá nhân · Portfolio", "Personal project · Portfolio"),
    summary: l(
      "Ứng dụng quản lý hồ sơ, kinh nghiệm, dự án, blog, chứng chỉ và mẫu CV; xuất bản portfolio công khai theo username.",
      "Manage profiles, experience, projects, blogs, certificates, and CV templates, and publish public portfolios by username.",
    ),
    problem: l(
      "Tập trung dữ liệu nghề nghiệp và nội dung portfolio trong một nơi quản lý, sau đó xuất bản trang cá nhân công khai.",
      "Manage career information and portfolio content in one place, then publish a public personal website.",
    ),
    contributions: [
      l(
        "Kết nối frontend Next.js với Laravel REST API và xác thực Sanctum; quản lý profile, nội dung và dự án.",
        "Connected a Next.js frontend with Laravel REST APIs and Sanctum authentication for profile, content, and project management.",
      ),
      l(
        "Cung cấp portfolio công khai, chi tiết dự án và trang quản trị; sử dụng PostgreSQL, Redis, Docker Compose và Nginx.",
        "Provided public portfolios, project details, and admin pages using PostgreSQL, Redis, Docker Compose, and Nginx.",
      ),
    ],
    technologies: [
      "Laravel",
      "PHP",
      "Sanctum",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL",
      "Redis",
      "Docker Compose",
      "Nginx",
    ],
    github: "https://github.com/tranchien2105-dotcom/teamflow",
    sources: ["../teamflow/README.md", "../teamflow/.git/config"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export function projectUrl(project: Pick<ProjectItem, "slug">): string {
  return `/projects/${project.slug}/`;
}
