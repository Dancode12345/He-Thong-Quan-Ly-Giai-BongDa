
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Trang chủ", path: "#/" },
  { label: "Đội bóng", path: "#/teams" },
  { label: "Giải đấu", path: "#/match-center" },
  { label: "Tin tức", path: "#/news" },
  { label: "Điều lệ", path: "#/regulations" },
  // { label: "Thống kê", path: "#/stats" },
];

export default function Navbar({ route }) {
  const [open, setOpen] = useState(false);

  // Lấy thông tin đăng nhập Admin / BTC
  const { user } = useAuth();

  // Thay đổi nút theo trạng thái đăng nhập
  const authLink = {
    label: user ? "Quản trị" : "BTC / Đăng nhập",
    path: user ? "#/admin" : "#/login",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">

        {/* LOGO VÀ TÊN GIẢI ĐẤU */}
        <a href="#/" className="flex items-center gap-3">
          <img
            src="/logodoi/BTT.jpg"
            alt="Hệ Thống Quản Lý Giải Bóng Đá Tỉnh Khánh Hoà"
            className="h-11 w-11 object-contain rounded"
          />

          <span>
            <span className="block text-sm font-black uppercase tracking-wide text-navypro">
              Hệ Thống Quản Lý Giải Bóng Đá Tỉnh Khánh Hoà
            </span>

            <span className="block text-xs font-semibold text-slate-500">
              Mùa giải năm 2026
            </span>
          </span>
        </a>

        {/* NÚT MENU TRÊN ĐIỆN THOẠI */}
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center rounded border border-slate-200 text-navypro md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Mở menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* MENU TRÊN MÁY TÍNH */}
        <div className="hidden items-center gap-1 md:flex">

          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`rounded px-3 py-2 text-sm font-bold transition ${
                route === item.path.replace("#", "")
                  ? "bg-navypro text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-navypro"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* NÚT ĐĂNG NHẬP ADMIN / BTC */}
          <a
            href={authLink.path}
            className="ml-2 inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-emerald-800"
          >
            <Shield size={17} />
            {authLink.label}
          </a>

        </div>
      </nav>

      {/* MENU ĐIỆN THOẠI */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="grid gap-2">

            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}

            {/* ĐĂNG NHẬP TRÊN ĐIỆN THOẠI */}
            <a
              href={authLink.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-3 text-sm font-bold text-white hover:bg-emerald-800"
            >
              <Shield size={18} />
              {authLink.label}
            </a>

          </div>
        </div>
      )}
    </header>
  );
}
