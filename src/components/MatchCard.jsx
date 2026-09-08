import { useMemo } from "react";

export default function MatchCard({ match, teams }) {
  const homeTeam = useMemo(() => teams.find((t) => t.id === match.homeTeamId), [teams, match.homeTeamId]);
  const awayTeam = useMemo(() => teams.find((t) => t.id === match.awayTeamId), [teams, match.awayTeamId]);

  const formatKickoff = (isoString) => {
    if (!isoString) return { time: "--:--", date: "--/--" };
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return { time: `${hours}:${minutes}`, date: `${day}/${month}` };
  };

  const { time, date } = formatKickoff(match.kickoff);

  const cardStyles = useMemo(() => {
    switch (match.status) {
      case "live":
        return {
          wrapper: "border-red-200 bg-gradient-to-br from-red-50/40 via-white to-white ring-2 ring-red-500/10 hover:border-red-400 hover:shadow-red-500/20",
          badge: "bg-red-500 text-white font-extrabold shadow-sm shadow-red-500/20 uppercase tracking-wider text-[11px]",
          scoreBg: "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/20 font-black",
          timeBg: "text-red-500 font-bold"
        };
      case "finished":
        return {
          wrapper: "border-slate-100 bg-white opacity-95 hover:border-slate-300 hover:shadow-slate-400/20",
          badge: "bg-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]",
          scoreBg: "bg-slate-900 text-white font-black",
          timeBg: "text-slate-400 font-medium"
        };
      default: // scheduled
        return {
          wrapper: "border-slate-200 bg-gradient-to-br from-slate-50/50 via-white to-white hover:border-emerald-400 hover:shadow-emerald-500/20",
          badge: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold uppercase tracking-wider text-[11px]",
          scoreBg: "bg-slate-100 border border-slate-200 text-slate-700 font-black shadow-inner",
          timeBg: "text-slate-600 font-bold"
        };
    }
  }, [match.status]);

  return (
    <a href={`#/match/${match.id}`} className={`group relative block overflow-hidden rounded-2xl border p-4 md:p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-md ${cardStyles.wrapper}`}>
      
      {/* HEADER: THỜI GIAN & TRẠNG THÁI */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4 md:mb-6">
        <div className="flex items-center gap-1.5 text-xs md:text-sm">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 font-bold ${cardStyles.timeBg}`}>
            <svg className="h-4 w-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {date}
          </span>
        </div>
        
        {/* Badge trạng thái */}
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black ${cardStyles.badge}`}>
          {match.status === "live" && <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>}
          {match.status === "live" ? "TRỰC TIẾP" : match.status === "finished" ? "HẾT GIỜ" : "LỊCH ĐẤU"}
        </span>
      </div>

      {/* BODY: SỬ DỤNG FLEXBOX TỐI ƯU KHÔNG GIAN CHO MOBILE */}
      <div className="flex items-center justify-between w-full gap-1.5 md:gap-4">
        
        {/* KHỐI ĐỘI NHÀ (Co dãn thông minh, text dịch sang phải) */}
        <div className="flex items-center justify-end flex-1 gap-2 md:gap-5 min-w-0">
          <span className="text-sm sm:text-base md:text-xl font-black text-slate-800 tracking-wide uppercase group-hover:text-navypro transition-colors truncate text-right">
            {homeTeam ? homeTeam.shortName || homeTeam.name : "Đội nhà"}
          </span>
          <div className="h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 flex-shrink-0 rounded-xl md:rounded-2xl bg-slate-50 p-1.5 md:p-2.5 border border-slate-200/80 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            <img
              src={homeTeam?.logo || "/logodoi/default.jpg"}
              alt="Home Logo"
              className="h-full w-full object-contain"
              onError={(e) => { e.target.src = "/logodoi/default.jpg"; }}
            />
          </div>
        </div>

        {/* KHỐI TRUNG TÂM: TỶ SỐ / GIỜ (Cố định khoảng cách an toàn vừa vặn) */}
        <div className="flex-shrink-0 flex justify-center items-center mx-1 sm:mx-3 md:mx-6">
          {match.status === "scheduled" ? (
            <div className={`rounded-xl px-2.5 py-2 md:px-4 md:py-2.5 text-center min-w-[55px] md:min-w-[70px] shadow-sm border ${cardStyles.scoreBg}`}>
              <span className="block text-xs md:text-base font-black tracking-tight">{time}</span>
            </div>
          ) : (
            <div className={`flex items-center justify-center gap-1.5 md:gap-3 rounded-xl px-3 py-2 md:px-5 md:py-2.5 min-w-[75px] md:min-w-[100px] text-center shadow-md ${cardStyles.scoreBg}`}>
              <span className="text-base md:text-2xl tracking-tight font-black">{match.homeScore}</span>
              <span className="text-xs md:text-sm opacity-50 font-bold">-</span>
              <span className="text-base md:text-2xl tracking-tight font-black">{match.awayScore}</span>
            </div>
          )}
        </div>

        {/* KHỐI ĐỘI KHÁCH (Co dãn thông minh, text dịch sang trái) */}
        <div className="flex items-center justify-start flex-1 gap-2 md:gap-5 min-w-0">
          <div className="h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 flex-shrink-0 rounded-xl md:rounded-2xl bg-slate-50 p-1.5 md:p-2.5 border border-slate-200/80 shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
            <img
              src={awayTeam?.logo || "/logodoi/default.jpg"}
              alt="Away Logo"
              className="h-full w-full object-contain"
              onError={(e) => { e.target.src = "/logodoi/default.jpg"; }}
            />
          </div>
          <span className="text-sm sm:text-base md:text-xl font-black text-slate-800 tracking-wide uppercase group-hover:text-navypro transition-colors truncate text-left">
            {awayTeam ? awayTeam.shortName || awayTeam.name : "Đội khách"}
          </span>
        </div>

      </div>

      {/* Hiệu ứng bóng đổ trang trí góc dưới */}
      <div className="absolute -right-8 -bottom-8 h-20 w-20 rounded-full bg-slate-100/50 blur-2xl group-hover:bg-indigo-100/60 transition-all duration-500" />
    </a>
  );
}