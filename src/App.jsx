// File: src/App.jsx
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import MatchCenter from "./pages/MatchCenter";
import MatchDetail from "./pages/MatchDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Regulations from "./pages/Regulations";
// import Stats from "./pages/Stats";
import TeamDetail from "./pages/TeamDetail";
import Teams from "./pages/Teams";
import { useEffect, useState } from "react";

const getRoute = () => window.location.hash.replace("#", "") || "/";

export default function App() {
  const [route, setRoute] = useState(getRoute);

  // 1. Hiệu ứng lắng nghe sự thay đổi của URL Hash để thực hiện chuyển trang
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // 2. HIỆU ỨNG ĐẶC BIỆT: Ép toàn bộ ứng dụng cuộn lên đầu trang mỗi khi biến `route` thay đổi
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTo(0, 0);
      if (document.body) document.body.scrollTo(0, 0);
    };

    // Đợi 10 mili-giây để React render xong giao diện trang mới rồi ép cuộn ngay lập tức
    const timer = setTimeout(scrollToTop, 10);
    
    return () => clearTimeout(timer);
  }, [route]); // Khởi chạy liên tục bất cứ khi nào đổi sang trang mới

  // Logic định tuyến kiểm tra và hiển thị các trang tương ứng
  let page = <Home />;
  if (route === "/teams") page = <Teams />;
  if (route.startsWith("/teams/")) page = <TeamDetail teamId={route.split("/")[2]} />;
  if (route === "/match-center") page = <MatchCenter />;
  if (route.startsWith("/match/")) page = <MatchDetail matchId={route.split("/")[2]} />;
  if (route === "/news") page = <News />;
  
  // Logic định tuyến trang chi tiết tin tức bằng ID bài viết
  if (route.startsWith("/news/")) page = <NewsDetail newsId={route.split("/")[2]} />;
  
  if (route === "/regulations") page = <Regulations />;
  if (route === "/stats") page = <Stats />;
  if (route === "/admin") page = <AdminDashboard />;

  return (
    <div className="min-h-screen bg-chalk flex flex-col">
      <Navbar route={route} />
      {/* Thêm phần flex-grow vào đây để đẩy Footer xuống đáy nếu nội dung trang quá ngắn */}
      <div className="flex-grow">
        {page}
      </div>
      <Footer />
    </div>
  );
}