# Nâng cấp portfolio tương tác

## Phạm vi đã triển khai

- 8 trang case study `/projects/[slug]/`, giữ 3 dự án nổi bật trên trang chủ và bộ lọc toàn bộ dự án.
- Nội dung chi tiết gồm tổng quan, bài toán, giải pháp/trách nhiệm, kiến trúc, công nghệ, thách thức và ảnh thực tế. GitHub/demo dùng dữ liệu đã có; các trường thiếu hiển thị trạng thái rõ ràng.
- 6 sơ đồ kiến trúc logic có nguồn đối chiếu: Technest, TaskFlow, Papertrail, PayFlow, SubFlow và TeamFlow. Node hỗ trợ click, hover, Tab, mũi tên, Home/End. Mobile hiển thị node và danh sách kết nối.
- Command Palette hỗ trợ Ctrl+K, Cmd+K, tìm dự án/công nghệ/section, tiếng Việt không dấu, mũi tên, Enter, Escape và trạng thái không có kết quả.
- Terminal mở/đóng trên mọi trang, dùng lại component hiện có; hỗ trợ 6 lệnh yêu cầu, giữ alias cũ. Không gọi shell hoặc backend.
- Career journey mở rộng từng giai đoạn công việc trong CV, có liên kết tới case study liên quan.
- Native dialog kết hợp vòng focus bằng Tab, Escape, trả focus về nút mở và khóa cuộn nền. Giao diện dùng chung design tokens, có responsive và reduced motion. Không thêm dependency.

## Các nhóm file chính

| Nhóm | File |
| --- | --- |
| Dữ liệu | `src/data/projects.ts`, `src/data/caseStudies.ts`, `src/types/caseStudy.ts` |
| Routing và metadata | `src/App.tsx`, `src/lib/routes.ts`, `src/lib/pageMetadata.ts`, `src/hooks/usePageMetadata.ts` |
| Case study | `src/pages/ProjectCaseStudy.tsx`, `src/pages/NotFoundPage.tsx`, `src/components/projects/InteractiveArchitecture.tsx`, `ProjectScreenshot.tsx`, `ProjectEntry.tsx` |
| Tương tác | `src/components/ui/CommandPalette.tsx`, `InteractiveTools.tsx`, `Modal.tsx`, `Terminal.tsx`, `src/lib/commandSearch.ts` |
| Tích hợp giao diện | `src/components/layout/Navbar.tsx`, `src/components/sections/Experience.tsx`, `src/styles/interactive.css`, `src/main.tsx`, `src/data/portfolio.ts` |
| Build và hosting | `scripts/prerenderCases.tsx`, `vite.config.ts`, `tsconfig.node.json`, `vercel.json` |
| Kiểm thử và tài liệu | `tests/interactive.test.ts`, `tests/projectFilters.test.ts`, `README.md`, `docs/projects-audit.md` |

Plugin build tái sử dụng components để dựng HTML riêng cho từng case study, cùng title/description/Open Graph và trang 404. Không cần cài framework/router mới hoặc truy cập các repository bên cạnh lúc build.

## Thông tin cần bổ sung

- DMS/VTech: tài liệu mô tả kết nối kiến trúc; VTech còn thiếu mô tả thách thức kỹ thuật chi tiết.
- 6 dự án ngoài Technest/Papertrail: ảnh chụp thực tế.
- Papertrail, PayFlow, SubFlow, TeamFlow: thời gian và vai trò cụ thể.
- PayFlow, DMS, VTech: GitHub nếu có thể công khai.
- TaskFlow, PayFlow, SubFlow, TeamFlow: demo công khai nếu có.
- DMS: URL demo thay thế vì URL trong CV từng trả về 404.
- Technest: xác nhận chênh lệch NestJS trong CV và Express 5/Drizzle trong source hiện tại. Ghi chú khác biệt được giữ trong dữ liệu audit và tài liệu nội bộ, không hiển thị banner trên trang dự án. Chưa suy diễn lịch sử thay đổi.

## Kết quả kiểm tra

- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`: thành công. Build cũng chạy TypeScript trước khi tạo output.
- Prettier và `git diff --check`: thành công.
- Chromium: 8 route trực tiếp; nội dung đọc được khi tắt JavaScript; 404; metadata; Ctrl/Cmd+K; tìm và chuyển trang/section; Escape; focus trap và trả focus; 6 lệnh terminal; timeline; bộ lọc cũ; tải CV; ảnh thật tải/giải mã thành công.
- Responsive 375px, 768px, 1440px với tiếng Việt/Anh; không tràn ngang. Không ghi nhận lỗi JavaScript runtime trong lượt kiểm tra luồng chính.

## Giới hạn kiểm tra

Các thao tác trình duyệt được kiểm tra với bản production phục vụ qua HTTP local, không phải bản Vercel đang chạy. Chưa đo Core Web Vitals từ người dùng thực tế. Build hiện thành công; Vite có cảnh báo về import thiếu phần mở rộng khi chuyển sang config loader `native` ở phiên bản tương lai. Loader hiện tại vẫn hoạt động.

Không push Git hoặc deploy trong lần nâng cấp này.
