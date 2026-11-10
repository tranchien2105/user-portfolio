import type {
  Architecture,
  ArchitectureNode,
  ArchitectureEdge,
  CaseStudy,
  TechnicalChallenge,
} from "../types/caseStudy";
import type { Localized } from "../types/portfolio";
const l = (vi: string, en: string): Localized => ({ vi, en });
const node = (
  id: string,
  label: string,
  column: number,
  row: number,
  vi: string,
  en: string,
): ArchitectureNode => ({ id, label, column, row, description: l(vi, en) });
const edge = (
  from: string,
  to: string,
  vi: string,
  en: string,
): ArchitectureEdge => ({ from, to, label: l(vi, en) });
const challenge = (
  vi: string,
  en: string,
  approachVi: string,
  approachEn: string,
): TechnicalChallenge => ({
  title: l(vi, en),
  approach: l(approachVi, approachEn),
});
const graph = (
  source: string,
  nodes: ArchitectureNode[],
  edges: ArchitectureEdge[],
): Architecture => ({ source, nodes, edges });
// Each graph describes documented logical connections, not an inferred production topology.
export const caseStudies: Record<string, CaseStudy> = {
  technest: {
    solution: [
      l(
        "React/Vite cung cấp storefront và admin; Express 5, TypeScript, Zod và Drizzle thực hiện API commerce và kiểm tra dữ liệu.",
        "React/Vite provides storefront and admin interfaces; Express 5, TypeScript, Zod, and Drizzle implement commerce APIs and input validation.",
      ),
      l(
        "Source hiện tại quản lý checkout COD, giá/tồn kho phía server, reservation và yêu cầu tạo đơn có idempotency key.",
        "The current source implements COD checkout, server-side pricing/stock checks, reservations, and idempotency keys for order creation.",
      ),
    ],
    implementationStack: [
      "React",
      "Vite",
      "Express 5",
      "TypeScript",
      "Drizzle ORM",
      "PostgreSQL",
      "Redis",
      "BullMQ",
    ],
    evidenceNote: l(
      "CV ghi nhận Technest với NestJS. Source Technest hiện tại trong workspace sử dụng Express 5 và Drizzle ORM; sơ đồ và phần triển khai dưới đây mô tả source hiện tại. Chưa có dữ liệu để xác nhận lịch sử thay đổi framework.",
      "The CV lists Technest with NestJS. The current local Technest source uses Express 5 and Drizzle ORM; the architecture and implementation notes below describe that source. The framework change history has not been documented.",
    ),
    architecture: graph(
      "Technest README; backend/package.json; backend/src/app.ts; backend/src/database/schema/orders.ts",
      [
        node(
          "web",
          "React storefront",
          0,
          1,
          "Danh mục, giỏ hàng, checkout và giao diện quản trị gọi API commerce.",
          "Catalog, cart, checkout, and admin interfaces call the commerce API.",
        ),
        node(
          "api",
          "Express 5 API",
          1,
          1,
          "TypeScript, Zod và Drizzle xử lý giá, tồn kho, đơn hàng và phân quyền.",
          "TypeScript, Zod, and Drizzle implement pricing, inventory, orders, and authorization.",
        ),
        node(
          "db",
          "PostgreSQL",
          2,
          0,
          "Lưu dữ liệu commerce, đơn hàng, reservation và ràng buộc idempotency.",
          "Persists commerce data, orders, reservations, and idempotency constraints.",
        ),
        node(
          "cache",
          "Redis",
          2,
          2,
          "Dịch vụ Redis được cấu hình cho cache và các tác vụ nền trong source hiện tại.",
          "Redis supports cache and background processing in the current implementation.",
        ),
      ],
      [
        edge("web", "api", "REST API", "REST API"),
        edge(
          "api",
          "db",
          "Drizzle · dữ liệu nghiệp vụ",
          "Drizzle · business data",
        ),
        edge(
          "api",
          "cache",
          "Cache & xử lý nền",
          "Cache & background processing",
        ),
      ],
    ),
    challenges: [
      challenge(
        "Checkout có thể được gửi lại",
        "Repeated checkout requests",
        "Source có idempotency key và ràng buộc duy nhất theo user/key ở bảng orders để nhận diện yêu cầu lặp.",
        "The source defines idempotency keys and a user/key uniqueness constraint on orders to identify repeated requests.",
      ),
      challenge(
        "Tồn kho và Flash Sale",
        "Inventory and Flash Sales",
        "Source quản lý reservation với trạng thái và thời hạn; worker giải phóng reservation hết hạn. Không có số liệu tải production được công bố.",
        "Reservations have states and expiry times, and a worker releases expired reservations. No production load measurements are published.",
      ),
    ],
    references: [
      "CV",
      "../technest/README.md",
      "../technest/backend/package.json",
      "../technest/backend/src/database/schema/orders.ts",
      "../technest/backend/src/server.ts",
    ],
  },
  taskflow: {
    architecture: graph(
      "TaskFlow README: Kiến trúc và luồng dữ liệu",
      [
        node(
          "web",
          "Next.js / React",
          0,
          1,
          "Gửi Bearer JWT qua REST API và nhận thông báo realtime.",
          "Sends Bearer JWT in REST requests and receives realtime notifications.",
        ),
        node(
          "api",
          "NestJS API",
          1,
          1,
          "Kiểm tra thành viên và vai trò theo project trước khi thao tác task/project.",
          "Checks project membership and roles before accessing tasks and projects.",
        ),
        node(
          "db",
          "PostgreSQL",
          2,
          0,
          "Lưu projects, tasks, thành viên và lời mời; schema qua TypeORM migrations.",
          "Stores projects, tasks, members, and invitations using TypeORM migrations.",
        ),
        node(
          "redis",
          "Redis cache",
          2,
          1,
          "Cache dữ liệu project theo triển khai đã ghi nhận.",
          "Caches project data as documented in the implementation.",
        ),
        node(
          "socket",
          "Socket.IO",
          2,
          2,
          "Phát notification vào room user:<userId>, giới hạn người nhận theo người dùng.",
          "Delivers notifications through user:<userId> rooms.",
        ),
      ],
      [
        edge("web", "api", "REST + JWT", "REST + JWT"),
        edge("api", "db", "TypeORM", "TypeORM"),
        edge("api", "redis", "Cache project", "Project cache"),
        edge("api", "socket", "Notification", "Notifications"),
        edge(
          "socket",
          "web",
          "Thông báo theo người dùng",
          "Per-user notifications",
        ),
      ],
    ),
    challenges: [
      challenge(
        "Quyền truy cập theo dự án",
        "Project-scoped access",
        "Backend kiểm tra membership trên tài nguyên project/task, đồng thời giới hạn assignee trong thành viên của project.",
        "The backend checks membership on project/task resources and restricts assignees to project members.",
      ),
      challenge(
        "Thông báo đúng người nhận",
        "Targeted notifications",
        "Socket.IO gửi sự kiện qua room theo user thay vì phát chung cho mọi client.",
        "Socket.IO delivers events through per-user rooms rather than broadcasting them to every client.",
      ),
    ],
    references: ["CV", "../taskflow/README.md"],
  },
  papertrail: {
    architecture: graph(
      "Papertrail README: Kiến trúc và xử lý dữ liệu",
      [
        node(
          "web",
          "Next.js UI",
          0,
          1,
          "Tìm mẫu, xem trước, nhập dữ liệu và tải file đã tạo.",
          "Searches templates, previews content, collects input, and downloads generated files.",
        ),
        node(
          "api",
          "NestJS API",
          1,
          1,
          "Kiểm tra đầu vào, thay placeholder bằng JSZip/Office Open XML và quản lý lịch sử tài liệu.",
          "Validates inputs, replaces placeholders with JSZip/Office Open XML, and manages document history.",
        ),
        node(
          "db",
          "PostgreSQL",
          2,
          0,
          "Lưu metadata mẫu, tài liệu và Demo User qua TypeORM.",
          "Stores template/document metadata and the Demo User through TypeORM.",
        ),
        node(
          "files",
          "Office files",
          2,
          2,
          "File nguồn và file đầu ra được lưu riêng; mỗi lần tạo sinh file độc lập.",
          "Source templates and generated outputs are stored separately, with an independent file for each generation.",
        ),
      ],
      [
        edge(
          "web",
          "api",
          "Tìm kiếm · preview · tạo file",
          "Search · preview · generate",
        ),
        edge("api", "db", "Metadata & lịch sử", "Metadata & history"),
        edge(
          "api",
          "files",
          "Đọc mẫu / ghi bản mới",
          "Read template / write new output",
        ),
      ],
    ),
    challenges: [
      challenge(
        "Giữ nguyên mẫu nguồn",
        "Preserving source templates",
        "Mỗi lần thay placeholder ghi ra một file mới; UUID liên kết file với metadata tài liệu.",
        "Placeholder replacement writes a new output file; a UUID links it to document metadata.",
      ),
      challenge(
        "Kiểm tra file Office tải lên",
        "Validating Office uploads",
        "Kiểm tra ZIP, các thành phần Office, giới hạn giải nén và đường dẫn lưu trữ trước khi xử lý.",
        "Validates ZIP structure, Office components, extraction limits, and storage paths before processing.",
      ),
    ],
    references: [
      "../document-template-library/README.md",
      "../document-template-library/backend/src/templates/template.service.ts",
    ],
  },
  payflow: {
    architecture: graph(
      "PayFlow payment service, controller and MoMo Sandbox README",
      [
        node(
          "client",
          "API client",
          0,
          1,
          "Tạo order và payment với idempotency key; đây là demo backend, chưa có frontend công khai.",
          "Creates orders and payments using an idempotency key; this is a backend demo without a public frontend.",
        ),
        node(
          "api",
          "NestJS Payments",
          1,
          1,
          "Kiểm tra provider/key, xác thực IPN, cập nhật payment và order trong transaction.",
          "Checks provider/key consistency, verifies IPNs, and updates payments/orders in transactions.",
        ),
        node(
          "db",
          "PostgreSQL",
          2,
          0,
          "Ràng buộc duy nhất cho idempotency key; pessimistic locks bảo vệ cập nhật trạng thái.",
          "A uniqueness constraint protects idempotency keys; pessimistic locks guard state updates.",
        ),
        node(
          "momo",
          "MoMo Sandbox",
          2,
          2,
          "Tạo checkout sandbox và gửi IPN có chữ ký về API; không phải giao dịch production.",
          "Creates sandbox checkouts and sends signed IPNs to the API; these are not production payments.",
        ),
      ],
      [
        edge(
          "client",
          "api",
          "Order & payment request",
          "Order & payment request",
        ),
        edge("api", "db", "Transaction + locks", "Transaction + locks"),
        edge("api", "momo", "Tạo checkout sandbox", "Create sandbox checkout"),
        edge("momo", "api", "IPN có chữ ký", "Signed IPN"),
      ],
    ),
    challenges: [
      challenge(
        "Yêu cầu và callback trùng",
        "Duplicate requests and callbacks",
        "Tra cứu idempotency key, xử lý xung đột unique và chấp nhận callback lặp cùng kết quả; từ chối đổi trạng thái đã kết thúc.",
        "Looks up idempotency keys, handles unique conflicts, and accepts identical repeated callbacks while rejecting changes to terminal states.",
      ),
      challenge(
        "Xác minh kết quả thanh toán",
        "Verifying payment results",
        "Chỉ IPN hợp lệ về chữ ký, số tiền và định danh mới cập nhật trạng thái. Redirect trên trình duyệt không được coi là bằng chứng thanh toán.",
        "Only IPNs with valid signatures, amounts, and identifiers update state. A browser redirect is not treated as payment confirmation.",
      ),
    ],
    references: [
      "../payflow/backend/src/payments/payments.service.ts",
      "../payflow/backend/src/payments/momo-signature.ts",
      "../payflow/backend/README.md",
    ],
  },
  subflow: {
    architecture: graph(
      "SubFlow README: Tổng quan kiến trúc và luồng xử lý video",
      [
        node(
          "web",
          "Next.js UI",
          0,
          0,
          "Upload video, theo dõi tiến độ và chỉnh sửa phụ đề.",
          "Uploads videos, tracks progress, and edits subtitles.",
        ),
        node(
          "api",
          "NestJS API",
          1,
          0,
          "Lưu thông tin video/job và đưa công việc vào hàng đợi.",
          "Persists video/job metadata and enqueues processing work.",
        ),
        node(
          "db",
          "PostgreSQL",
          2,
          0,
          "Lưu video, job, phụ đề và checkpoint bản dịch.",
          "Stores videos, jobs, subtitles, and translation checkpoints.",
        ),
        node(
          "queue",
          "BullMQ / Redis",
          1,
          1,
          "Điều phối tác vụ nền và cơ chế thử lại.",
          "Coordinates background jobs and retries.",
        ),
        node(
          "worker",
          "Video worker",
          1,
          2,
          "Gọi công cụ xử lý và lưu checkpoint để tiếp tục khi thử lại.",
          "Runs processing tools and persists checkpoints for retry recovery.",
        ),
        node(
          "ffmpeg",
          "FFmpeg",
          0,
          2,
          "Tách âm thanh từ video trước khi nhận diện.",
          "Extracts audio before transcription.",
        ),
        node(
          "whisper",
          "faster-whisper",
          2,
          1,
          "Nhận diện lời thoại tiếng Nhật với mốc thời gian.",
          "Transcribes Japanese speech with timestamps.",
        ),
        node(
          "ollama",
          "Ollama",
          2,
          2,
          "Dịch phụ đề sang tiếng Việt theo từng nhóm câu.",
          "Translates subtitle batches into Vietnamese.",
        ),
      ],
      [
        edge("web", "api", "Upload & theo dõi", "Upload & polling"),
        edge("api", "db", "Lưu metadata", "Persist metadata"),
        edge("api", "queue", "Enqueue", "Enqueue"),
        edge("queue", "worker", "Xử lý nền", "Background processing"),
        edge("worker", "ffmpeg", "Tách audio", "Extract audio"),
        edge("worker", "whisper", "Nhận diện", "Transcribe"),
        edge("worker", "ollama", "Dịch", "Translate"),
        edge("worker", "db", "Lưu checkpoint", "Persist checkpoints"),
      ],
    ),
    challenges: [
      challenge(
        "Công việc dài và thử lại",
        "Long-running work and retries",
        "BullMQ xử lý nền; worker lưu phụ đề và từng nhóm bản dịch để tái sử dụng checkpoint khi chạy lại.",
        "BullMQ runs work in the background, and the worker persists subtitles and translation batches for checkpoint-based retries.",
      ),
      challenge(
        "Giới hạn phạm vi xử lý",
        "Processing scope",
        "Luồng hiện hỗ trợ video upload tiếng Nhật và dịch sang tiếng Việt; không mô tả URL-import là tính năng xử lý đã hoàn thiện.",
        "The pipeline supports uploaded Japanese videos translated into Vietnamese; URL-import processing is not presented as a completed feature.",
      ),
    ],
    references: [
      "../subflow/README.md",
      "../subflow/apps/api/src/videos/video-processing.processor.ts",
    ],
  },
  teamflow: {
    architecture: graph(
      "TeamFlow README: Kiến trúc",
      [
        node(
          "web",
          "Next.js / React",
          0,
          1,
          "Dashboard quản lý hồ sơ và portfolio công khai theo username.",
          "A profile-management dashboard and public portfolios by username.",
        ),
        node(
          "api",
          "Laravel API",
          1,
          1,
          "API quản lý nội dung và xác thực bằng Sanctum.",
          "Content-management APIs with Sanctum authentication.",
        ),
        node(
          "db",
          "PostgreSQL",
          2,
          0,
          "Lưu profile, dự án, kinh nghiệm và nội dung portfolio.",
          "Stores profiles, projects, experience, and portfolio content.",
        ),
        node(
          "redis",
          "Redis",
          2,
          2,
          "Cache, queue và session theo tài liệu dự án.",
          "Cache, queue, and session services as documented by the project.",
        ),
      ],
      [
        edge("web", "api", "REST API", "REST API"),
        edge("api", "db", "Dữ liệu portfolio", "Portfolio data"),
        edge(
          "api",
          "redis",
          "Cache · queue · session",
          "Cache · queue · session",
        ),
      ],
    ),
    challenges: [
      challenge(
        "Quản lý và xuất bản hồ sơ",
        "Managing and publishing profiles",
        "Tách dashboard quản lý nội dung khỏi portfolio công khai theo username; Laravel API cung cấp dữ liệu và xác thực Sanctum.",
        "Separates content-management dashboards from public username-based portfolios, with data and Sanctum authentication provided by Laravel APIs.",
      ),
    ],
    references: ["../teamflow/README.md"],
  },
  "dms-system": {
    challenges: [
      challenge(
        "Đồng bộ dữ liệu nghiệp vụ",
        "Business data synchronization",
        "CV ghi nhận phát triển Cluster APIs, tích hợp API và tối ưu truy vấn. Chưa có mô tả topology đủ chi tiết để dựng sơ đồ kiến trúc.",
        "The CV records Cluster APIs, API integration, and query optimization. It does not provide enough topology detail for an architecture diagram.",
      ),
    ],
    references: ["CV"],
  },
  vtech: { challenges: [], references: ["CV"] },
};
