import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) window.location.hash = "#/admin";
  }, [loading, user]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await login(username.trim(), password);
      window.location.hash = "#/admin";
    } catch (err) {
      setError(err.message || "Không thể đăng nhập. Hãy thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-2">
      <aside className="hidden flex-col justify-between bg-gradient-to-br from-[#0c1735] via-[#152e53] to-[#136b58] p-12 text-white lg:flex">
        <div className="flex items-center gap-3 text-xl font-black uppercase tracking-wide">
          <ShieldCheck className="text-emerald-300" size={34} /> Goalazo Admin
        </div>
        <div className="max-w-lg">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[.2em] text-emerald-300">Cổng điều hành giải đấu</p>
          <h1 className="text-5xl font-black leading-tight">Quản lý giải đấu tập trung, chính xác và an toàn.</h1>
          <p className="mt-5 text-lg text-slate-200">Dành riêng cho Ban tổ chức và Quản trị viên hệ thống.</p>
        </div>
        <p className="text-sm text-slate-300">Hệ thống quản lý giải bóng đá • 2026</p>
      </aside>

      <main className="flex min-h-screen items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl sm:p-9">
          <a href="#/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-700">
            <ArrowLeft size={16} /> Về trang chủ
          </a>
          <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <LockKeyhole size={28} />
          </div>
          <h2 className="mt-5 text-3xl font-black text-slate-900">Đăng nhập quản trị</h2>
          <p className="mt-2 text-sm text-slate-500">Sử dụng tài khoản do Admin hệ thống cấp.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-bold text-slate-700">
              Tên đăng nhập
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-emerald-600">
                <UserRound size={19} className="text-slate-400" />
                <input autoComplete="username" required maxLength={80} value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full bg-transparent py-3 outline-none" placeholder="Nhập tên tài khoản" />
              </div>
            </label>
            <label className="block text-sm font-bold text-slate-700">
              Mật khẩu
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-emerald-600">
                <LockKeyhole size={19} className="text-slate-400" />
                <input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent py-3 outline-none" placeholder="Nhập mật khẩu" />
                <button type="button" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  onClick={() => setShowPassword(!showPassword)} className="text-slate-500">
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </label>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={submitting || loading}
              className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-black text-white transition hover:bg-emerald-800 disabled:opacity-60">
              {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-slate-500">Không có tài khoản? Liên hệ quản trị viên để được cấp quyền.</p>
        </div>
      </main>
    </div>
  );
}
