# Website giới thiệu tỉnh Đồng Tháp

Website tĩnh gồm 6 trang, dùng HTML, CSS, JavaScript và dữ liệu JSON riêng.

## Cấu trúc thư mục

```text
dong-thap-website/
├── index.html                 # Trang tổng quan
├── kham-pha.html              # Thiên nhiên và điểm đến
├── van-hoa.html               # Văn hóa, lịch sử, lễ hội, làng nghề
├── am-thuc.html               # Ẩm thực và đặc sản
├── kinh-te.html               # Kinh tế và đời sống
├── thong-tin.html             # Thông tin hành chính và nguồn tham khảo
├── css/style.css              # Toàn bộ giao diện và hiệu ứng
├── js/main.js                 # Điều hướng, render nội dung, tương tác
└── data/content.json          # Nội dung các trang
```

## Cách chạy website

Do trình duyệt thường chặn `fetch()` khi mở file HTML trực tiếp bằng `file://`, hãy chạy bằng một máy chủ nội bộ:

**Cách 1 — VS Code Live Server**
1. Giải nén thư mục.
2. Mở thư mục `dong-thap-website` bằng Visual Studio Code.
3. Cài extension **Live Server** nếu chưa có.
4. Nhấn chuột phải `index.html` → **Open with Live Server**.

**Cách 2 — Python**
1. Mở Terminal / Command Prompt tại thư mục `dong-thap-website`.
2. Chạy lệnh:

   ```bash
   python -m http.server 8000
   ```

3. Mở trình duyệt tại `http://localhost:8000`.

## Tùy chỉnh nội dung

- Sửa chữ, số liệu, hình ảnh và liên kết trong `data/content.json`.
- Sửa màu sắc, font, bố cục và hiệu ứng trong `css/style.css`.
- Sửa cách tạo navbar, footer, card và hiệu ứng tương tác trong `js/main.js`.
- Các trang HTML dùng `data-page` để chọn đúng nội dung trong JSON; giữ nguyên tên key khi chỉnh sửa.

## Thành phần tương tác

- Navbar cố định, hiệu ứng hover và đánh dấu trang đang mở.
- Menu thu gọn trên điện thoại.
- Thanh tiến độ cuộn trang và nút quay lại đầu trang.
- Hiệu ứng reveal khi cuộn tới nội dung.
- Hiệu ứng zoom ảnh và nâng thẻ nội dung khi rê chuột.
- Liên kết giữa các trang, cùng footer dùng chung.

## Lưu ý về dữ liệu và hình ảnh

- Phần thông tin hành chính sử dụng thông tin tỉnh Đồng Tháp sau sắp xếp năm 2025; nội dung nêu rõ đây là tỉnh mới hình thành từ Đồng Tháp và Tiền Giang trước đây.
- Một số ảnh được gọi từ nguồn bên ngoài nên cần kết nối Internet khi xem. Nếu ảnh không tải được, các khung ảnh sẽ tự chuyển sang nền màu dự phòng.
- Đây là website giới thiệu phục vụ học tập/tham khảo; khi dùng cho tài liệu chính thức, nên kiểm tra số liệu và thông tin mới nhất trên cổng thông tin tỉnh.
