const express = require("express");
const bcrypt = require("bcryptjs");
const { rateLimit } = require("express-rate-limit");
const db = require("../database");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Thử đăng nhập quá nhiều. Vui lòng thử lại sau." },
});

router.get("/me", (req, res, next) => {
  if (!req.session?.userId) return res.json({ user: null });
  db.get(
    "SELECT id, username, name, role FROM users WHERE id = ?",
    [req.session.userId],
    (error, user) => {
      if (error) return next(error);
      res.json({ user: user && ["admin", "btc"].includes(user.role) ? user : null });
    }
  );
});

router.post("/login", loginLimiter, (req, res, next) => {
  const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const password = req.body?.password;
  if (!username || typeof password !== "string" || password.length > 128) {
    return res.status(400).json({ message: "Dữ liệu đăng nhập không hợp lệ." });
  }

  db.get(
    "SELECT id, username, password, role, name FROM users WHERE username = ?",
    [username],
    async (error, account) => {
      if (error) return next(error);
      try {
        const valid = account && await bcrypt.compare(password, account.password);
        if (!valid || !["admin", "btc"].includes(account.role)) {
          return res.status(401).json({ message: "Tên đăng nhập hoặc mật khẩu không đúng." });
        }

        // Chống session fixation: đổi mã phiên sau khi đăng nhập thành công.
        req.session.regenerate((sessionError) => {
          if (sessionError) return next(sessionError);
          req.session.userId = account.id;
          req.session.save((saveError) => {
            if (saveError) return next(saveError);
            res.json({
              user: {
                id: account.id,
                username: account.username,
                name: account.name,
                role: account.role,
              },
            });
          });
        });
      } catch (compareError) {
        next(compareError);
      }
    }
  );
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    const production = process.env.NODE_ENV === "production";
    res.clearCookie("goalazo.sid", {
      path: "/",
      httpOnly: true,
      secure: production,
      sameSite: production ? "none" : "lax",
    });
    res.json({ message: "Đã đăng xuất." });
  });
});

module.exports = router;
