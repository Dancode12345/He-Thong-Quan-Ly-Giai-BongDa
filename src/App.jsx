
import { useEffect, useState } from "react";

// Các thành phần giao diện chung
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Các trang hiện tại của website
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import MatchCenter from "./pages/MatchCenter";
import MatchDetail from "./pages/MatchDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Regulations from "./pages/Regulations";
import Stats from "./pages/Stats";
import AdminDashboard from "./pages/AdminDashboard";

// Các thành phần đăng nhập và bảo vệ Admin/BTC
import Login from "./pages/auth/Login.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

// Lấy đường dẫn hiện tại từ URL
const getRoute = () =>
  window.location.hash.replace("#", "") || "/";

export default function App() {
  const [route, setRoute] = useState(getRoute);

  // Lắng nghe sự thay đổi URL
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  // Cuộn lên đầu trang khi chuyển trang
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);

      if (document.documentElement) {
        document.documentElement.scrollTo(0, 0);
      }

      if (document.body) {
        document.body.scrollTo(0, 0);
      }
    };

    const timer = setTimeout(scrollToTop, 10);

    return () => clearTimeout(timer);
  }, [route]);

  // =====================================
  // 1. TRANG ĐĂNG NHẬP ADMIN / BTC
  // =====================================

  if (route === "/login") {
    return <Login />;
  }

  // =====================================
  // 2. TRANG QUẢN TRỊ CÓ BẢO VỆ
  // =====================================

  if (route === "/admin") {
    return (
      <ProtectedRoute roles={["admin", "btc"]}>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  // =====================================
  // 3. CÁC TRANG WEBSITE CÔNG KHAI
  // =====================================

  let page = <Home />;

  if (route === "/teams") {
    page = <Teams />;
  }

  if (route.startsWith("/teams/")) {
    page = (
      <TeamDetail teamId={route.split("/")[2]} />
    );
  }

  if (route === "/match-center") {
    page = <MatchCenter />;
  }

  if (route.startsWith("/match/")) {
    page = (
      <MatchDetail matchId={route.split("/")[2]} />
    );
  }

  if (route === "/news") {
    page = <News />;
  }

  if (route.startsWith("/news/")) {
    page = (
      <NewsDetail newsId={route.split("/")[2]} />
    );
  }

  if (route === "/regulations") {
    page = <Regulations />;
  }

  if (route === "/stats") {
    page = <Stats />;
  }

  // =====================================
  // 4. GIAO DIỆN WEBSITE CHÍNH
  // =====================================

  return (
    <div className="min-h-screen bg-chalk flex flex-col">
      <Navbar route={route} />

      <div className="flex-grow">
        {page}
      </div>

      <Footer />
    </div>
  );
}
