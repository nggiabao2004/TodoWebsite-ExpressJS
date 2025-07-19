# Todo App API (ExpressJS + MongoDB)

Website quản lý "công việc" (Todo) với tính năng đăng ký/ đăng nhập tài khoản, xác thực JWT và thao tác CRUD (Create-Read-Update-Delete) các Task công việc. Ngoài ra còn có chatbot (chạy API Gemini) để giúp tìm hiểu thông tin, xử lý công việc 1 cách nhanh chóng và hiệu quả.
- Mục tiêu: Rèn luyện CRUD API, JWT và Javascript. Và thêm API Gemini vào chatbot
- Công cụ: Postman, Swagger Editor, MongoDB, Visual Studio Code

## 1. Cài đặt và khởi động dự án

### Bước 1: Khởi tạo và cài đặt các package cần thiết

```bash
npm init -y
npm install express bcrypt mongoose dotenv jsonwebtoken express-async-handler
npm install --save-dev nodemon
npm install @google/generative-ai
```

### Bước 2: Cấu hình script trong `package.json`

```json
"scripts": {
  "start": "nodemon app.js"
}
```

### Bước 3: Cấu hình MongoDB và biến môi trường

- Bật MongoDB trên máy hoặc dùng MongoDB Atlas.
- Tạo file **.env** ở thư mục gốc, ví dụ:

```
MONGO_URI=<Link MongoDB Cluster>
MONGO_PORT=3000
JWT_SECRET=<your_secret_key>
GEMINI_API_KEY=<your_api_key_gemini>
```

### Bước 4: Khởi động server

```bash
npm start
```

---

## 2. Các bước test API User (Register, Login, Profile)

### Bước 1. Đăng ký tài khoản (Register)
- Gửi request `POST` tới: `http://localhost:3000/api/user/register`
- Body (JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```
- Nếu thành công sẽ nhận được thông báo đăng ký thành công.

### Bước 2. Đăng nhập (Login)
- Gửi request `POST` tới: `http://localhost:3000/api/user/login`
- Body (JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```
- Nếu thành công sẽ nhận được một trường `token` trong response.

### Bước 3. Lấy thông tin Profile
- Gửi request `GET` tới: `http://localhost:3000/api/user/profile`
- Trong tab **Headers** của Postman, thêm:
  ```
  Key: Authorization
  Value: Bearer <token>
  ```
  (Thay `<token>` bằng token nhận được ở bước đăng nhập)
- Nếu token hợp lệ, sẽ nhận được thông tin user.

**Lưu ý:**  
- Luôn gửi header `Authorization` khi truy cập các API cần xác thực.
- Nếu thiếu hoặc sai token, sẽ nhận lỗi 401.

---

## 3. Các bước test API Todo

### API 1. Lấy danh sách Todo
- `GET http://localhost:3000/api/todo`

### API 2. Thêm mới Todo
- `POST http://localhost:3000/api/todo`
- Body (JSON):
  ```json
  {
    "title": "Viết tài liệu",
    "description": "Hoàn thành README.md"
  }
  ```

### API 3. Lấy chi tiết Todo theo id
- `GET http://localhost:3000/api/todo/{id}`

### API 4. Cập nhật Todo theo id
- `PUT http://localhost:3000/api/todo/{id}`
- Body (JSON): (giống như API POST CreateTodo)
  ```json
  {
    "title": "Viết tài liệu",
    "description": "Hoàn thành README.md"
  }

### API 5. Xóa Todo theo id
- `DELETE http://localhost:3000/api/todo/{id}`

---

## 4. Tài liệu API (Swagger)

- File tài liệu: `swagger.yaml`
- Có thể xem trực tiếp tại [https://editor.swagger.io/](https://editor.swagger.io/) bằng cách copy nội dung file vào.

## 5. Hướng dẫn tạo API KEY Gemini (Google Generative AI)

Để sử dụng tính năng Chatbot AI Gemini, bạn cần tạo API Key từ Google AI Studio:

### Bước 1: Đăng nhập Google AI Studio

- Truy cập: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Đăng nhập bằng tài khoản Google của bạn.

### Bước 2: Tạo API Key

- Nhấn nút **Create API Key** (Tạo API Key).
- Đặt tên cho key nếu muốn, sau đó nhấn **Create**.
- Sao chép API Key vừa tạo.

### Bước 3: Thêm API Key vào file `.env`

- Mở file `.env` ở thư mục gốc dự án.
- Thêm dòng sau (hoặc cập nhật nếu đã có):

  ```
  GEMINI_API_KEY=<your_api_key_gemini>
  ```

  (Thay `your_api_key_gemini` bằng API Key bạn vừa sao chép.)

### Bước 4: Vào `chatbotController.js` và chỉnh sửa model AI Gemini theo thiết lập ban đầu từ `Create API Key`

  ```
  const model= genAI.getGenerativeModel({model: "<Model_AI_Gemini>"});
  ```

### Bước 5: Khởi động lại server

- Sau khi cập nhật `.env`, hãy khởi động lại server để các thay đổi có hiệu lực:

  ```bash
  npm start
  ```

**Lưu ý:**
- API Key Gemini chỉ dùng cho các model hỗ trợ bởi Google AI Studio (ví dụ: `gemini-pro`, hoặc `gemini-2.5-flash`).
- Nếu có thay đổi model AI Gemini khác thì vào `chatbotController.js` và thay đổi model mình muốn xài (theo thiết lập ban đầu từ `Create API Key`)
- Không chia sẻ API Key công khai để tránh bị lạm dụng.
- Nếu gặp lỗi về model hoặc key, hãy tạo lại API Key mới tại `Google AI Studion`.

---
