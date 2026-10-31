
const db = require("../database");

// Kiểm tra quyền truy cập của Admin và BTC
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const userId = req.session?.userId;

    // Chưa đăng nhập
    if (!userId) {
      return res.status(401).json({
        message: "Bạn cần đăng nhập để tiếp tục.",
      });
    }

    // Kiểm tra người dùng trong cơ sở dữ liệu
    db.get(
      "SELECT id, username, name, role FROM users WHERE id = ?",
      [userId],
      (error, user) => {
        if (error) {
          return next(error);
        }

        if (!user) {
          return res.status(401).json({
            message: "Phiên đăng nhập không hợp lệ.",
          });
        }

        // Kiểm tra vai trò Admin hoặc BTC
        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({
            message: "Bạn không có quyền truy cập.",
          });
        }

        // Lưu người dùng đã xác thực
        req.authUser = user;

        next();
      }
    );
  };
}

module.exports = requireRole;
