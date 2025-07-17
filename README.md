# Todo App API (ExpressJS + MongoDB)

Ứng dụng quản lý Todo với tính năng đăng ký, đăng nhập, xác thực JWT và thao tác CRUD Todo.
- Mục tiêu: Rèn luyện CRUD API, Token và Hash password
- Công cụ: Postman, Swagger Editor, MongoDB, Visual Studio Code

## 1. Cài đặt và khởi động dự án

### Bước 1: Khởi tạo và cài đặt các package cần thiết

```bash
npm init -y
npm install express bcrypt mongoose dotenv jsonwebtoken express-async-handler
npm install --save-dev nodemon
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
```

### Bước 4: Khởi động server

```bash
npm start
```

---

## 2. Các bước test API User (Register, Login, Profile)

### 1. Đăng ký tài khoản (Register)
- Gửi request `POST` tới: `http://localhost:3000/api/user/register`
- Body (JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```
- Nếu thành công sẽ nhận được thông báo đăng ký thành công.

### 2. Đăng nhập (Login)
- Gửi request `POST` tới: `http://localhost:3000/api/user/login`
- Body (JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "123456"
  }
  ```
- Nếu thành công sẽ nhận được một trường `token` trong response.

### 3. Lấy thông tin Profile
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

### 1. Lấy danh sách Todo
- `GET http://localhost:3000/api/todo`

### 2. Thêm mới Todo
- `POST http://localhost:3000/api/todo`
- Body (JSON):
  ```json
  {
    "title": "Viết tài liệu",
    "description": "Hoàn thành README.md"
  }
  ```

### 3. Lấy chi tiết Todo theo id
- `GET http://localhost:3000/api/todo/{id}`

### 4. Cập nhật Todo theo id
- `PUT http://localhost:3000/api/todo/{id}`
- Body (JSON): (giống như API POST CreateTodo)
  ```json
  {
    "title": "Viết tài liệu",
    "description": "Hoàn thành README.md"
  }

### 5. Xóa Todo theo id
- `DELETE http://localhost:3000/api/todo/{id}`

---

## 4. Tài liệu API (Swagger)

- File tài liệu: `swagger.yaml`
- Có thể xem trực tiếp tại [https://editor.swagger.io/](https://editor.swagger.io/) bằng cách copy nội dung file vào.

