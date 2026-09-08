import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";


const navItems = [
  { label: "Trang chủ", path: "#/" },
  { label: "Đội bóng", path: "#/teams" },
  { label: "Giải đấu", path: "#/match-center" },
  { label: "Tin tức", path: "#/news" },
  { label: "Điều lệ", path: "#/regulations" },
  // { label: "Thống kê", path: "#/stats" },
  // { label: "Admin", path: "#/admin" }
];

export default function Navbar({ route }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        <a href="#/" className="flex items-center gap-3">
          <img
            src="logodoi/BTT.jpg"
            alt="BAN TRUYỀN THÔNG - THUEN"
            className="h-11 w-11 object-contain rounded"
          />

          <span>
            <span className="block text-sm font-black uppercase tracking-wide text-navypro">BAN TRUYỀN THÔNG - THUEN</span>
            <span className="block text-xs font-semibold text-slate-500">Hoạt động hè năm 2026</span>
          </span>
        </a>

        <button
          className="grid h-10 w-10 place-items-center rounded border border-slate-200 text-navypro md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Mở menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`rounded px-3 py-2 text-sm font-bold transition ${route === item.path.replace("#", "")
                  ? "bg-navypro text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-navypro"
                }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

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
          </div>
        </div>
      )}
    </header>
  );
}
