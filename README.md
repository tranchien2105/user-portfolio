# Tran Minh Chien — Portfolio cá nhân

Website giới thiệu kinh nghiệm và dự án phát triển phần mềm, xây dựng bằng React 19, TypeScript và Vite. Giao diện sáng theo phong cách editorial, hỗ trợ chế độ tối, nội dung Việt/Anh, terminal tương tác và đồng hồ theo giờ TP. Hồ Chí Minh.

Trang chủ điều hướng đến từng mục bằng liên kết neo. Trang `/projects/` có HTML đầu vào và metadata riêng. Mỗi dự án có trang case study `/projects/[slug]/` với nội dung HTML dựng sẵn khi build. Website sử dụng liên kết điều hướng thông thường, không có thư viện router hoặc backend.

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
- `src/data/projects.ts`: thông tin chung của toàn bộ dự án.
- `src/data/caseStudies.ts`: giải pháp, thách thức kỹ thuật, sơ đồ kiến trúc và nguồn đối chiếu.
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
- Đã xem lại ảnh chụp giao diện desktop và mobile. Phần tối ưu loại bỏ hiệu ứng theo con trỏ, các lớp làm mờ lớn và việc tải phông chữ trùng lặp. Command Palette và trang danh sách dự án được tải theo nhu cầu.
- Chưa đo Core Web Vitals từ người dùng thực tế.

## Danh sách dự án

- Trang `/` hiển thị các dự án có `featured: true`. Hiện có 3 dự án nổi bật: Technest, TaskFlow và Papertrail.
- Trang `/projects/` hiển thị toàn bộ 8 dự án, không giới hạn số lượng. Tìm kiếm hỗ trợ cả hai ngôn ngữ và các nội dung như tên, bài toán, đóng góp kỹ thuật, công nghệ.
- Bộ lọc lĩnh vực, công nghệ và từ khóa kết hợp theo điều kiện AND, nghĩa là dự án phải thỏa mãn tất cả điều kiện đang chọn. Bộ lọc được lưu trong tham số URL: `q`, `category`, `tech`.
- Slug ổn định tạo trang chi tiết, ví dụ `/projects/papertrail/`. Mỗi case study trình bày tổng quan, bài toán, giải pháp, kiến trúc, công nghệ, thách thức và ảnh chụp. Các mục thiếu dữ liệu có thông báo rõ ràng.
- Để bổ sung dự án, thêm một đối tượng `ProjectItem` vào `src/data/projects.ts`. Các lựa chọn công nghệ và số lượng dự án theo lĩnh vực được tính từ dữ liệu, không cần sửa bố cục. Đặt `featured: true` để đưa dự án lên trang chủ; nên duy trì từ 2–4 dự án nổi bật.
- Các trường `role`, `period`, `github`, `live`, `screenshot` là tùy chọn. Nếu chưa có dữ liệu xác thực, giao diện hiển thị trạng thái phù hợp. Trường `notes` ghi chú phạm vi và giới hạn; `sources` lưu nguồn đối chiếu.
- Bộ lọc công nghệ chuẩn hóa nhãn phiên bản, chẳng hạn `NestJS 11` khớp với `NestJS`, đồng thời giữ nguyên nhãn công nghệ khi hiển thị.
- `npm test` kiểm tra bộ lọc, routing, metadata, tìm kiếm lệnh và tính nhất quán của dữ liệu kiến trúc bằng Node.js 22.

### Triển khai hosting tĩnh

Triển khai toàn bộ thư mục `dist/`. Plugin `scripts/prerenderCases.tsx` tái sử dụng React components để dựng HTML cho 8 trang `/projects/[slug]/` và `404.html`; không phụ thuộc các repository dự án bên cạnh khi build. Nội dung và metadata của trang chi tiết đọc được cả khi chưa chạy JavaScript.

`vercel.json` cấu hình Vite, thư mục output và URL có dấu `/` cuối. Các route sử dụng thư mục HTML thật, không cần catch-all rewrite về trang chủ. Trang không tồn tại nhận trang 404; không biến slug lạ thành trang chủ.

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

## Trải nghiệm tương tác

- **Daily Welcome:** 36 lời chúc Việt/Anh, tối đa một lần mỗi ngày local; toast tự biến mất sau khoảng 4,4 giây, không cản click/scroll. Phối hợp nhiều tab bằng BroadcastChannel/Web Locks và lease dự phòng. Storage bị chặn thì bỏ qua lời chúc. Xem [thiết kế và cách kiểm tra](docs/daily-welcome.md).

- **Phản hồi khi tải:** skeleton cho danh sách dự án và tìm nhanh, thanh báo chuyển trang, khung chờ ảnh giữ đúng tỷ lệ và nút thử lại khi tải ảnh thất bại. Loading kết thúc theo trạng thái tải thực tế, không thêm thời gian chờ giả.
- **Con trỏ:** mũi tên nhỏ bo mềm khi duyệt trang, bàn tay khi rê lên nút/link; viền xanh nhẹ, không dùng hình con vật hoặc biểu tượng trang trí. SVG cục bộ, chỉ áp dụng cho thiết bị có chuột; ô nhập liệu giữ con trỏ văn bản.

- **Menu chuột phải:** menu lối tắt đồng bộ giao diện, mở tìm nhanh, dự án, liên hệ và terminal. Hỗ trợ ↑/↓, Home/End, Enter/Space, Escape; tự điều chỉnh vị trí để không vượt màn hình. Shift + chuột phải mở menu trình duyệt. Các ô nhập liệu và vùng văn bản đang được chọn giữ menu mặc định.
- **Tìm nhanh:** nhấn Ctrl+K hoặc Cmd+K, hoặc nút kính lúp trên thanh điều hướng. Tìm dự án, công nghệ hoặc mục nội dung; dùng ↑/↓, Enter và Escape. Tìm kiếm hỗ trợ tiếng Việt không dấu. Palette được tải khi mở lần đầu.
- **Sơ đồ kiến trúc:** có trong 6 case study đủ thông tin xác thực. Chọn node bằng chuột, Tab, phím mũi tên, Home hoặc End để xem giải thích. Trên mobile, các node và danh sách kết nối vẫn đọc được. DMS và VTech chưa có đủ tài liệu để dựng sơ đồ.
- **Terminal:** nút Terminal mở console nhỏ trên mọi trang. Hỗ trợ `help`, `about`, `skills`, `projects`, `contact`, `clear` và giữ các alias cũ. Đây là mô phỏng cục bộ bằng React, không có shell hoặc backend.
- **Career journey:** mở từng giai đoạn để xem trách nhiệm, công nghệ và case study liên quan. Nội dung giữ đúng 2 công ty và thời gian trong CV.
- Các cửa sổ dùng native dialog, giữ focus trong cửa sổ, hỗ trợ Escape và trả focus về nút mở.

### Lưu ý về nguồn kỹ thuật

CV mô tả Technest với NestJS, trong khi source hiện tại của Technest dùng Express 5 và Drizzle ORM. Ghi chú đối chiếu được giữ trong tài liệu nội bộ; case study dùng source hiện tại cho sơ đồ/chi tiết triển khai; chưa xác nhận lịch sử thay đổi framework. Stack trong bản CV được giữ để đối chiếu.

Ảnh chụp thực tế hiện có ở Technest và Papertrail. Sáu dự án còn thiếu ảnh; DMS/VTech thiếu tài liệu kiến trúc. Ngày thực hiện và vai trò cụ thể của Papertrail, PayFlow, SubFlow, TeamFlow vẫn cần bổ sung. Không thêm số liệu hiệu năng hoặc kết quả production khi chưa có bằng chứng.

Chi tiết phạm vi, nhóm file thay đổi và giới hạn kiểm tra tại [báo cáo nâng cấp tương tác](docs/interactive-upgrade.md).
