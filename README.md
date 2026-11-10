# Tran Minh Chien — Portfolio cá nhân

Website giới thiệu kinh nghiệm và dự án phát triển phần mềm, xây dựng bằng React 19, TypeScript và Vite. Giao diện sáng theo phong cách editorial, hỗ trợ chế độ tối, nội dung Việt/Anh, terminal tương tác và đồng hồ theo giờ TP. Hồ Chí Minh.

Trang chủ điều hướng đến từng mục bằng liên kết neo. Trang `/projects/` có HTML đầu vào và metadata riêng. Website sử dụng liên kết điều hướng thông thường, không có thư viện router hoặc backend.

## Cài đặt và phát triển

Sử dụng Node.js 22.12 trở lên. Phiên bản dùng để kiểm tra là Node.js 22.23.2.

```sh
# Cài đặt dependency theo lockfile
npm ci

# Chạy môi trường phát triển
npm run dev

# Kiểm tra mã nguồn và kiểu dữ liệu
npm run lint
npm run typecheck

# Chạy kiểm thử dự án và bộ lọc
npm test

# Tạo bản build production
npm run build

# Xem trước bản build
npm run preview
```

## Quản lý nội dung

CV gốc nằm tại `docs/Tran-Minh-Chien-SortWareEngineer.pdf`.

- `src/data/portfolio.ts`: thông tin cá nhân, kinh nghiệm làm việc, nhóm kỹ năng và học vấn.
- `src/data/projects.ts`: nguồn dữ liệu tập trung cho toàn bộ dự án.
- Các trường song ngữ sử dụng cấu trúc `{ vi, en }`.

Bản CV phục vụ tải xuống nằm tại `public/Tran-Minh-Chien-SortWareEngineer.pdf`. Khi thay CV, cập nhật dữ liệu portfolio và đồng bộ bản tải xuống:

```sh
cp docs/Tran-Minh-Chien-SortWareEngineer.pdf public/Tran-Minh-Chien-SortWareEngineer.pdf
```

CV ghi nhận kinh nghiệm tại FinViet, Software Shinway và các dự án Technest, TaskFlow, DMS System, VTech. Danh sách mở rộng bổ sung Papertrail, PayFlow, SubFlow và TeamFlow dựa trên tài liệu và mã nguồn trong workspace.

CV chưa cung cấp LinkedIn, demo công khai của TaskFlow hoặc repository của DMS/VTech. Những trường này được để trống khi chưa có thông tin xác thực.

Trong lần kiểm tra HTTP ngày 10/11/2026, GitHub cá nhân, repository Technest, repository TaskFlow, demo Technest và website VTech trả về mã 200. Website DMS trong CV trả về 404; URL gốc được giữ trong dữ liệu để tham khảo và cần được chủ sở hữu cập nhật.

## Giao diện và khả năng truy cập

Tiêu đề các mục dùng chung component `src/components/ui/SectionHeading.tsx`. Các biến thiết kế và kiểu dáng được quản lý tại `src/styles/global.css`. Bố cục điều chỉnh theo các mốc 1100px, 800px và 600px.

Website sử dụng tiêu đề, danh sách HTML có ngữ nghĩa, liên kết bỏ qua điều hướng và trạng thái focus rõ ràng cho bàn phím. Hiệu ứng chuyển động tuân theo `prefers-reduced-motion`; phông chữ tải với `display=swap`.

Giao diện mặc định là chế độ sáng. Lựa chọn sáng/tối của người dùng được lưu bằng khóa `portfolio-theme`.

Không bổ sung thư viện UI hoặc dependency chạy ứng dụng trong các lần nâng cấp giao diện. Công cụ kiểm tra trình duyệt được dùng tạm thời, không thuộc mã nguồn ứng dụng.

## Kiểm tra và xác minh

- Các lệnh lint, typecheck và build đã chạy thành công.
- Kiểm tra bằng Chromium bao gồm điều hướng theo mục, tải PDF, lệnh terminal, lưu lựa chọn ngôn ngữ/giao diện, điều khiển đồng hồ và hỗ trợ giảm chuyển động.
- Đã kiểm tra tràn ngang tại các kích thước 320px, 375px, 600px, 768px, 1024px và 1440px. Bản giao diện mới được kiểm tra riêng ở 375px, 768px và 1440px với cả tiếng Việt và tiếng Anh. Không ghi nhận lỗi runtime trong các lượt kiểm tra này.
- Đã xem lại ảnh chụp giao diện desktop và mobile. Phần tối ưu loại bỏ hiệu ứng theo con trỏ, các lớp làm mờ lớn và việc tải phông chữ trùng lặp. Gói JavaScript chính của bản production khoảng 87 kB sau gzip.
- Chưa đo Core Web Vitals từ người dùng thực tế.

## Danh sách dự án

- Trang `/` hiển thị các dự án có `featured: true`. Hiện có 3 dự án nổi bật: Technest, TaskFlow và Papertrail.
- Trang `/projects/` hiển thị toàn bộ 8 dự án, không giới hạn số lượng. Tìm kiếm hỗ trợ cả hai ngôn ngữ và các nội dung như tên, bài toán, đóng góp kỹ thuật, công nghệ.
- Bộ lọc lĩnh vực, công nghệ và từ khóa kết hợp theo điều kiện AND, nghĩa là dự án phải thỏa mãn tất cả điều kiện đang chọn. Bộ lọc được lưu trong tham số URL: `q`, `category`, `tech`.
- Slug ổn định tạo liên kết trực tiếp, ví dụ `/projects/#papertrail`. Khi mở liên kết, phần chi tiết kỹ thuật tương ứng sẽ được mở rộng. Có thể tái sử dụng slug khi bổ sung trang `/projects/[slug]` sau này; hiện chưa triển khai các trang chi tiết riêng.
- Để bổ sung dự án, thêm một đối tượng `ProjectItem` vào `src/data/projects.ts`. Các lựa chọn công nghệ và số lượng dự án theo lĩnh vực được tính từ dữ liệu, không cần sửa bố cục. Đặt `featured: true` để đưa dự án lên trang chủ; nên duy trì từ 2–4 dự án nổi bật.
- Các trường `role`, `period`, `github`, `live`, `screenshot` là tùy chọn. Nếu chưa có dữ liệu xác thực, giao diện hiển thị trạng thái phù hợp. Trường `notes` ghi chú phạm vi và giới hạn; `sources` lưu nguồn đối chiếu.
- Bộ lọc công nghệ chuẩn hóa nhãn phiên bản, chẳng hạn `NestJS 11` khớp với `NestJS`, đồng thời giữ nguyên nhãn công nghệ khi hiển thị.
- `npm test` chạy kiểm thử dự án và bộ lọc bằng khả năng hỗ trợ TypeScript tích hợp của Node.js 22.

### Triển khai hosting tĩnh

Triển khai toàn bộ thư mục `dist/` và cấu hình máy chủ phục vụ file `index.html` trong từng thư mục. Bản build tạo cả `dist/index.html` và `dist/projects/index.html`; đường dẫn `/projects` cần chuyển hướng sang `/projects/`.

Hai trang này không yêu cầu cấu hình chuyển mọi đường dẫn về trang chủ hoặc thư viện router. Mã của trang danh sách dự án chỉ được tải khi cần; HTML của trang có tiêu đề, mô tả và metadata Open Graph riêng.

Xem [báo cáo đối chiếu dự án](docs/projects-audit.md) để biết nguồn dữ liệu, thông tin còn thiếu và nguồn ảnh chụp.

## Hệ thống thiết kế và trình bày năng lực

Bảng màu giao diện sáng:

| Thành phần | Màu       |
| ---------- | --------- |
| Nền chính  | `#FFFFFF` |
| Nền phụ    | `#F8FAFC` |
| Chữ chính  | `#111827` |
| Chữ phụ    | `#475569` |
| Điểm nhấn  | `#2563EB` |
| Đường viền | `#E2E8F0` |

Phần giới thiệu trình bày các điểm nổi bật trong sự nghiệp cùng dẫn chứng. Kỹ năng được chia thành 4 nhóm: Backend Engineering, Frontend Development, Database & Caching và DevOps & Infrastructure.

Logo công nghệ dạng SVG được tải từ tài nguyên cục bộ qua component `TechnologyBadge`; biểu tượng nhóm năng lực dùng `CapabilityIcon`. Ghi chú kỹ năng phân biệt kinh nghiệm công việc, dự án cá nhân và thực hành trong lab.

Dự án nổi bật có ảnh chụp thật của Technest và Papertrail. TaskFlow sử dụng sơ đồ luồng kỹ thuật có nhãn rõ ràng. Danh sách đầy đủ vẫn giữ cả 8 dự án.

Nguồn tài nguyên hình ảnh và quyết định bố cục được ghi tại [tài liệu thiết kế và tài nguyên](docs/visual-assets.md).
