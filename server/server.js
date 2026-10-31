
require("dotenv").config({
  path: require("node:path").join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

// Cơ sở dữ liệu hiện tại của nhóm
const db = require("./database");

// API đăng nhập Admin/BTC
const authRoutes = require("./routes/auth");
const requireRole = require("./middleware/requireRole");

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Kiểm tra khóa bảo mật phiên đăng nhập
if (
  !process.env.SESSION_SECRET ||
  process.env.SESSION_SECRET.length < 32 ||
  process.env.SESSION_SECRET.startsWith("THAY_BANG")
) {
  throw new Error(
    "SESSION_SECRET chưa được cấu hình hợp lệ."
  );
}

// Hỗ trợ HTTPS reverse proxy khi triển khai
if (isProduction) {
  app.set("trust proxy", 1);
}

// Cấu hình CORS
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error("Origin không được cấp quyền.")
      );
    },
    credentials: true,
  })
);

// Nhận dữ liệu JSON
app.use(express.json({ limit: "32kb" }));

// Kiểm tra nguồn của những yêu cầu thay đổi dữ liệu
app.use((req, res, next) => {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return next();
  }

  const origin = req.get("Origin");

  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      message: "Nguồn gửi yêu cầu không hợp lệ.",
    });
  }

  if (!req.is("application/json")) {
    return res.status(415).json({
      message: "Yêu cầu phải sử dụng JSON.",
    });
  }

  next();
});

// Cấu hình phiên đăng nhập
app.use(
  session({
    name: "goalazo.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: new SQLiteStore({
      db: "sessions.sqlite",
      dir: __dirname,
    }),

    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 8 * 60 * 60 * 1000,
    },
  })
);

// ======================================
// 1. KIỂM TRA SERVER
// ======================================

app.get("/", (req, res) => {
  res.json({
    message: "API Server GOALAZO đang hoạt động bình thường!",
  });
});

// ======================================
// 2. API ĐỘI BÓNG - GIỮ NGUYÊN
// ======================================

app.get("/api/teams", (req, res) => {
  db.all("SELECT * FROM teams", [], (err, rows) => {
    if (err) {
      console.error("Lỗi truy vấn database:", err.message);

      return res.status(500).json({
        message: "Không thể tải danh sách đội bóng.",
      });
    }

    res.json({ teams: rows });
  });
});

// ======================================
// 3. API ĐĂNG NHẬP / ĐĂNG XUẤT
// ======================================

app.use("/api/auth", authRoutes);

// ======================================
// 4. KIỂM TRA QUYỀN ADMIN VÀ BTC
// ======================================

// Admin và BTC đều có quyền truy cập
app.get(
  "/api/admin/ping",
  requireRole("admin", "btc"),
  (req, res) => {
    res.json({
      message: "Đăng nhập hợp lệ.",
      user: req.authUser,
    });
  }
);

// Chỉ Admin được truy cập
app.get(
  "/api/admin/only",
  requireRole("admin"),
  (req, res) => {
    res.json({
      message: "Bạn có quyền Admin.",
    });
  }
);

// ======================================
// 5. XỬ LÝ LỖI
// ======================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    message: "Máy chủ gặp lỗi. Vui lòng thử lại.",
  });
});

// ======================================
// 6. KHỞI ĐỘNG SERVER
// ======================================

app.listen(PORT, () => {
  console.log(
    `Server đang chạy tại: http://localhost:${PORT}`
  );
});
