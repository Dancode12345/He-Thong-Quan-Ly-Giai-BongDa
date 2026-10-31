import { Home, LayoutDashboard, LogOut, ShieldCheck, Users, CalendarDays, Newspaper } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const [error, setError] = useState("");
  async function handleLogout() {
    setError("");
    try {
      await logout();
      window.location.hash = "#/login";
    } catch (err) {
      setError(err.message || "Đăng xuất thất bại");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="bg-[#0c1735] p-5 text-white lg:min-h-screen lg:w-64 lg:flex-shrink-0">
        <div className="flex items-center gap-2 text-lg font-black"><ShieldCheck className="text-emerald-400" /> GOALAZO ADMIN</div>
        <p className="mt-2 text-xs text-slate-300">{user?.name} • {user?.role === "admin" ? "Quản trị viên" : "Ban tổ chức"}</p>
        <nav className="mt-8 space-y-2" aria-label="Menu quản trị">
          <a href="#/admin" className="flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-3 text-sm font-bold">
            <LayoutDashboard size={18} /> Tổng quan quản trị
          </a>
          <p className="px-3 pt-4 text-xs uppercase tracking-wider text-slate-400">Chức năng phát triển tiếp</p>
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400"><Users size={16} /> Quản lý đội bóng</div>
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400"><CalendarDays size={16} /> Lịch thi đấu</div>
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400"><Newspaper size={16} /> Tin tức</div>
          <a href="#/" className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm hover:bg-white/10"><Home size={18} /> Xem website</a>
        </nav>
        <button onClick={handleLogout} className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-bold hover:bg-white/10">
          <LogOut size={18} /> Đăng xuất
        </button>
        {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
      </aside>
      <div className="min-w-0 flex-1">
        <div className="border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-900">
          Chú ý: Các nút cập nhật trong AdminDashboard hiện thao tác trên dữ liệu mẫu của React. Chưa sử dụng để quản lý dữ liệu chính thức trong SQLite.
        </div>
        {children}
      </div>
    </div>
  );
}
