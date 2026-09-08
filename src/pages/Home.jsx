// File hoàn chỉnh đã fix lỗi tràn mobile: src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Flame, Trophy } from "lucide-react";
import Countdown from "../components/Countdown";
import MatchCard from "../components/MatchCard";
import StandingTable from "../components/StandingTable";
import { useTournament } from "../context/TournamentContext";

export default function Home() {
  const { data, standings, nextMatch } = useTournament();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const liveMatch = data.matches.find((match) => match.status === "live");
  const upcomingMatch = data.matches
    .filter((match) => match.status !== "finished")
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    .find((match) => new Date(match.kickoff) >= now);
  const featuredMatch = liveMatch || upcomingMatch || data.matches.find((match) => match.hot) || nextMatch;
  const featuredLabel = featuredMatch?.status === "live" ? "Trận đang diễn ra" : "Trận sắp diễn ra";

  // 🌟 KHỚP CHUẨN 100% THEO ẢNH MẪU ĐẦY ĐỦ ĐỘI CỦA BẠN
  const groupAStandings = standings.filter(row => {
    if (row.group) return row.group.toUpperCase() === "A";
    const name = row.name?.toUpperCase() || "";
    return name.includes("20") || name.includes("21") || name.includes("23") || name.includes("24") || name.includes("SADBOYS");
  });

  const groupBStandings = standings.filter(row => {
    if (row.group) return row.group.toUpperCase() === "B";
    const name = row.name?.toUpperCase() || "";
    return name.includes("CỰU") || name.includes("22") || name.includes("Q10") || name.includes("XÂY DỰNG") || name.includes("15");
  });

  return (
    // 🛡️ FIX CHÍ MẠNG: Thêm max-w-full và overflow-x-hidden để triệt tiêu hoàn toàn lỗi tràn mép phải trên điện thoại
    <div className="w-full max-w-full overflow-x-hidden">
      
      {/* SECTION HERO FIELD */}
      <section className="hero-field text-white">
        {/* 📱 FIX RESPONSIVE: Thay đổi padding py-8 trên mobile, py-16 trên PC để giao diện cân đối hơn */}
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-8 px-4 py-8 md:py-16 grid-cols-1 md:grid-cols-[1.1fr_0.9fr] lg:px-6">
          
          {/* CỘT TRÁI: TIÊU ĐỀ & ĐẾM NGƯỢC */}
          <div className="w-full min-w-0">
            <span className="inline-flex items-center gap-2 rounded bg-limeflash px-3 py-1 text-sm font-black text-navypro">
              <Trophy size={16} /> {data.tournament.season}
            </span>

            {/* 📱 FIX RESPONSIVE: Hạ font chữ xuống text-2xl ở mobile để không bị gãy chữ GIẢI BÓNG ĐÁ */}
            <h1 className="mt-4 max-w-3xl text-2xl font-black leading-tight sm:text-3xl md:text-5xl uppercase tracking-tight break-words">
              GIẢI B
              <span className="inline-flex items-center relative">
                <span className="relative inline-block mx-0.5 h-[0.9em] w-[0.9em] align-middle">
                  <span className="absolute -top-[0.45em] left-[55%] -translate-x-1/2 text-[0.55em] font-black text-white select-none drop-shadow-md">
                    ́
                  </span>
                  <span className="flex h-full w-full items-center justify-center">
                    ⚽️
                  </span>
                </span>
              </span>
              NG ĐÁ TRUYỀN THỐNG CHI HỘI TN - HS -SV HẬU SANH 2026
            </h1>

            {/* 📱 FIX RESPONSIVE: Hạ bớt text size trên mobile */}
            <p className="mt-4 max-w-2xl text-base md:text-lg font-medium leading-relaxed text-slate-100">
              Cổng thông tin chính thức cho lịch thi đấu, kết quả, bảng xếp hạng, tin tức và thống kê cá nhân của giải.
            </p>
            
            {featuredMatch && (
              <div className="mt-6 w-full max-w-xl">
                <p className="mb-2 text-xs md:text-sm font-black uppercase text-limeflash tracking-wider">{featuredLabel}</p>
                <Countdown target={featuredMatch.kickoff} />
              </div>
            )}
          </div>

          {/* CỘT PHẢI: LƯU Ý & TRẬN ĐẤU HOT */}
          <div className="w-full min-w-0 space-y-4">
            
            {/* THẺ LƯU Ý DEMO */}
            <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 p-4 text-amber-200 backdrop-blur-md shadow-lg w-full box-border">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className="text-xs md:text-sm font-bold leading-snug">
                <span className="font-black uppercase text-amber-300">Lưu ý:</span> Nội dung và số liệu trên hệ thống này hiện tại chỉ mang tính chất DEMO thử nghiệm giải đấu.
              </div>
            </div>

            {/* KHU VỰC TRẬN ĐẤU HOT */}
            {featuredMatch && (
              <div className="glass rounded border border-white/40 p-4 md:p-5 text-navypro shadow-glow w-full box-border overflow-hidden">
                <div className="mb-3 flex items-center gap-2 text-ember">
                  <Flame size={20} />
                  <h2 className="text-lg md:text-xl font-black uppercase">{featuredLabel}</h2>
                </div>
                {/* Đảm bảo bản thân component MatchCard cũng co giãn tốt */}
                <div className="w-full overflow-hidden">
                  <MatchCard match={featuredMatch} teams={data.teams} />
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION BẢNG TIN / TIN TỨC NỔI BẬT */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-pitch">Bảng tin</p>
            <h2 className="text-2xl md:text-3xl font-black text-navypro">Sự kiện nổi bật</h2>
          </div>
          <a href="#/news" className="rounded bg-navypro px-4 py-2 text-xs md:text-sm font-black text-white whitespace-nowrap">Xem tất cả</a>
        </div>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
          {data.news.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="flex flex-col overflow-hidden rounded border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 group"
            >
              <a href={`#/news/${article.id}`} className="flex flex-col flex-1 cursor-pointer">
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=60";
                    }}
                  />
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <div className="flex-grow">
                    <span className="rounded bg-limeflash px-2 py-1 text-xs font-black text-navypro inline-block">
                      {article.category}
                    </span>
                    <h3 className="mt-3 text-base md:text-lg font-black text-navypro leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[44px]">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                      {article.content}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end text-xs font-black text-blue-700 group-hover:text-blue-900 transition-colors uppercase tracking-wider items-center gap-1">
                    Xem thêm
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 🏆 SECTION BẢNG XẾP HẠNG NỀN XÁM NHẠT */}
      <section className="bg-slate-100 py-12 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          
          <div className="mb-6">
            <p className="text-sm font-black uppercase text-pitch">Standings</p>
            <h2 className="text-2xl md:text-3xl font-black text-navypro">Bảng xếp hạng giải đấu</h2>
          </div>

          {/* Khung Grid chứa 2 bảng đấu song song */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            
            {/* CỘT BẢNG A */}
            <div className="space-y-3 w-full overflow-hidden">
              <h3 className="text-sm md:text-base font-black text-white bg-navypro px-4 py-2.5 rounded shadow-sm flex items-center gap-2 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-limeflash animate-pulse"></span>
                Bảng A
              </h3>
              <div className="w-full overflow-x-auto">
                <StandingTable standings={groupAStandings} />
              </div>
            </div>

            {/* CỘT BẢNG B */}
            <div className="space-y-3 w-full overflow-hidden">
              <h3 className="text-sm md:text-base font-black text-white bg-navypro px-4 py-2.5 rounded shadow-sm flex items-center gap-2 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse"></span>
                Bảng B
              </h3>
              <div className="w-full overflow-x-auto">
                <StandingTable standings={groupBStandings} />
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}