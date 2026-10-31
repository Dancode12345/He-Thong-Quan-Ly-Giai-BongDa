import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, roles = ["admin", "btc"] }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) window.location.hash = "#/login";
  }, [loading, user]);

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-slate-100 text-slate-600">Đang xác minh phiên đăng nhập...</main>;
  }
  if (!user) return null;
  if (!roles.includes(user.role)) {
    return <main className="grid min-h-screen place-items-center p-6 text-red-700">Bạn không có quyền truy cập khu vực này.</main>;
  }
  return children;
}
