# Daily Welcome

Lời chúc tự xuất hiện một lần mỗi ngày trên cùng trình duyệt, dùng ngày local của người truy cập. Không gửi thông tin ra server và không thêm dependency.

## File và trách nhiệm

- `src/data/dailyWishes.ts`: 36 lời chúc Việt/Anh, không trùng nhau.
- `src/lib/dailyWelcome.ts`: ngày local, chọn lời chúc, lưu trạng thái và phối hợp nhiều tab.
- `src/components/ui/DailyWelcome.tsx`: điều phối hiển thị, timer và trạng thái toast.
- `src/styles/daily-welcome.css`: giao diện, responsive và reduced motion.
- `src/App.tsx`: tích hợp trong app shell, hoạt động cả trang chủ và trang dự án.
- `tests/dailyWelcome.test.ts`: kiểm tra dữ liệu, ngày local, lựa chọn deterministic, lưu trạng thái và ranh giới lịch/DST.

## Ngày và nội dung

Khóa `portfolio:daily-welcome:last-date` trong localStorage lưu `YYYY-MM-DD`, tạo từ `getFullYear()`, `getMonth()`, `getDate()` của người truy cập. Không lấy ngày từ `toISOString()`.

Lời chúc được chọn bằng số thứ tự ngày lịch local modulo số lời chúc. Cùng ngày luôn có cùng nội dung và hai ngày liên tiếp luôn khác nhau. UTC chỉ dùng để đánh số các trường lịch đã lấy theo local, tránh sai lệch do DST; không dùng ngày UTC của thời điểm truy cập.

Khi giữ trang mở qua nửa đêm, timer kiểm tra lại ngày và lên lịch cho nửa đêm tiếp theo. Khi quay lại tab hoặc cửa sổ được focus, ngày cũng được kiểm tra lại để xử lý tab ngủ và thay đổi đồng hồ/múi giờ.

## Nhiều tab và storage

- Chỉ tab đang hiển thị mới được nhận quyền hiển thị lời chúc.
- BroadcastChannel giúp các tab thông báo đã xem và chọn một tab khi mở đồng thời, bao gồm trường hợp tab giữ snapshot storage cũ.
- Web Locks tuần tự hóa thao tác đọc/ghi ngày khi API khả dụng.
- Nhánh dự phòng sử dụng lease ngắn hạn trong localStorage; lease có hạn dùng và chỉ chủ sở hữu mới được xóa. Khi cả Web Locks và BroadcastChannel đều không có, nhánh lease là best effort, không phải giao dịch nguyên tử giữa các process.
- Nếu localStorage bị chặn, đầy hoặc không lưu được, bỏ qua lời chúc. Không hiển thị lời chúc không được ghi nhận rồi lặp lại mỗi lần reload.
- Không đọc storage trong render. Server render không có toast nên không tạo khác biệt trạng thái ban đầu khi hydrate. React StrictMode setup/cleanup được xử lý bằng AbortSignal và bước defer trước khi nhận quyền.
- Hủy timers, event listeners, BroadcastChannel và yêu cầu lock khi component bị tháo khỏi app shell.

## UI và thời gian

Lời chúc nằm cố định ở giữa màn hình, dùng design tokens hiện có. Khung rộng tối đa 560px, chữ lớn và biểu tượng mặt trời ở phía trên; trên màn hình thấp chuyển sang bố cục ngang. Không có lớp phủ tối nền. Không có nút đóng, không thay đổi layout, không khóa scroll và toàn bộ toast dùng `pointer-events: none`.

- Fade-in / slide-up: 400ms.
- Giữ nội dung: 3.500ms.
- Fade-out: 500ms.
- Sau tổng 4.400ms, DOM của toast được gỡ bỏ hoàn toàn.

Dùng `role="status"`, `aria-live="polite"` và không chuyển focus. Khi bật `prefers-reduced-motion`, bỏ animation nhưng giữ thời gian đọc và tự gỡ toast.

## Kiểm tra thủ công

1. Dùng profile trình duyệt mới hoặc xóa riêng khóa ngày nêu trên, mở website và quan sát toast.
2. Reload, mở trang dự án hoặc tab khác: không có lời chúc lần hai cùng ngày.
3. Mở hai tab cùng lúc trong profile mới: chỉ một tab nhận lời chúc.
4. Kiểm tra ngày mới, bao gồm múi giờ có ngày khác UTC và qua nửa đêm khi đang mở trang.
5. Chặn localStorage: các tính năng còn lại vẫn chạy, lời chúc được bỏ qua an toàn.
6. Bật reduced motion, thử ở 375/768/1440px và xác nhận toast không cản click/scroll.
7. Sau khoảng 4,4 giây, `.daily-welcome` không còn trong DOM.

## Kết quả kiểm thử

- Lint, typecheck, production build và bộ kiểm thử hiện có: thành công.
- Kiểm thử ngày/giờ chạy thêm với `TZ=America/Los_Angeles` và `TZ=Pacific/Kiritimati`.
- Chromium trên bản production: truy cập đầu ngày, reload, điều hướng, tab mới, hai tab đồng thời với/cả không có Web Locks, storage bị chặn, reduced motion, tự gỡ DOM và responsive 375/768/1440px.
- Giả lập ngày local khác UTC và chuyển qua nửa đêm khi trang đang mở: lời chúc ngày mới xuất hiện, khác ngày trước.
- React dev StrictMode với Web Locks bị vô hiệu hóa: hiện đúng một lần, reload không lặp.
- Không ghi nhận lỗi JavaScript runtime trong các lượt kiểm tra trên. Đã xem ảnh giao diện desktop và mobile.

Không push Git hoặc deploy trong lần triển khai này.
