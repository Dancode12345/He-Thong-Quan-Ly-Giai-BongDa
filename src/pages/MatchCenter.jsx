import { useState } from "react";
import MatchCard from "../components/MatchCard";
import StandingTable from "../components/StandingTable";
import { useTournament } from "../context/TournamentContext";

export default function MatchCenter() {
  const [tab, setTab] = useState("matches");
  const { data, standings } = useTournament();
  const rounds = [...new Set(data.matches.map((match) => match.round))];

  // 🌟 1. LOGIC TỰ ĐỘNG PHÂN CHIA BẢNG DỰA TRÊN DATA GIẢI ĐẤU (ĐÃ FIX THIẾU ĐỘI)
  const groupAStandings = standings.filter((row) => {
    const teamInfo = data.teams.find(
      (t) => t.id?.toLowerCase() === row.id?.toLowerCase() || t.name?.toLowerCase() === row.name?.toLowerCase()
    );
    const group = teamInfo?.group || row.group;
    return String(group || "").toUpperCase() === "A";
  });

  const groupBStandings = standings.filter((row) => {
    const teamInfo = data.teams.find(
      (t) => t.id?.toLowerCase() === row.id?.toLowerCase() || t.name?.toLowerCase() === row.name?.toLowerCase()
    );
    const group = teamInfo?.group || row.group;
    return String(group || "").toUpperCase() === "B";
  });

  // 🌟 2. HÀM TỰ ĐỘNG QUÉT TOÀN BỘ TRẬN ĐẤU ĐỂ TÍNH VUA PHÁ LƯỚI
  const getDynamicScorers = () => {
    const scorerMap = {};

    data.matches.forEach((match) => {
      if (match.scorers && Array.isArray(match.scorers)) {
        match.scorers.forEach((scorer) => {
          // Bỏ qua nếu không có tên hoặc tên mẫu DEMO để danh sách trống chuẩn xác
          if (!scorer.name || scorer.name.trim() === "" || scorer.name.includes("Cầu thủ")) return;

          const key = `${scorer.name.trim()}_${scorer.teamId}`;

          const goalCount = Number(scorer.goals ?? 1);

          if (scorerMap[key]) {
            scorerMap[key].goals += goalCount;
          } else {
            const teamObj = data.teams.find((t) => t.id === scorer.teamId);
            
            scorerMap[key] = {
              id: key,
              name: scorer.name.trim(),
              number: scorer.number ?? null,
              team: teamObj ? teamObj.name : "Chưa xác định",
              goals: goalCount,
              avatar: "🏃‍♂️"
            };
          }
        });
      }
    });

    return Object.values(scorerMap).sort((a, b) => b.goals - a.goals).slice(0, 10);
  };

  const sortedScorers = getDynamicScorers();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div>
        <p className="text-sm font-black uppercase text-pitch">MATCH CENTER</p>
        <h1 className="text-4xl font-black text-navypro">Trung tâm giải đấu</h1>
        <p className="text-sm font-bold text-amber-600 italic mt-2 flex items-center gap-1">
          ⚠️ Nội dung này chỉ mang tính chất DEMO
        </p>
      </div>

      {/* THANH CHUYỂN TAB ĐỒNG CẤP */}
      <div className="mt-6 inline-flex rounded border border-slate-200 bg-white p-1 shadow-sm">
        <button 
          onClick={() => setTab("matches")} 
          className={`rounded px-4 py-2 text-sm font-black transition-colors ${tab === "matches" ? "bg-navypro text-white" : "text-slate-600 hover:text-navypro"}`}
        >
          Lịch thi đấu & Kết quả
        </button>
        <button 
          onClick={() => setTab("standings")} 
          className={`rounded px-4 py-2 text-sm font-black transition-colors ${tab === "standings" ? "bg-navypro text-white" : "text-slate-600 hover:text-navypro"}`}
        >
          Bảng xếp hạng
        </button>
        <button 
          onClick={() => setTab("scorers")} 
          className={`rounded px-4 py-2 text-sm font-black transition-colors ${tab === "scorers" ? "bg-navypro text-white" : "text-slate-600 hover:text-navypro"}`}
        >
          Vua phá lưới
        </button>
      </div>

      {/* TAB LỊCH THI ĐẤU */}
      {tab === "matches" && (
        <div className="mt-8 grid gap-8">
          {rounds.map((round) => (
            <section key={round}>
              <h2 className="mb-4 text-2xl font-black text-navypro">{round}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {data.matches
                  .filter((match) => match.round === round)
                  .map((match) => (
                    <MatchCard key={match.id} match={match} teams={data.teams} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* TAB BẢNG XẾP HẠNG */}
      {tab === "standings" && (
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8 items-start w-full">
          <div className="space-y-3">
            <h3 className="text-base font-black text-white bg-navypro px-4 py-2.5 rounded shadow-sm flex items-center gap-2 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-limeflash animate-pulse"></span>
              Bảng A
            </h3>
            <StandingTable standings={groupAStandings} />
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-black text-white bg-navypro px-4 py-2.5 rounded shadow-sm flex items-center gap-2 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse"></span>
              Bảng B
            </h3>
            <StandingTable standings={groupBStandings} />
          </div>
        </div>
      )}

      {/* TAB VUA PHÁ LƯỚI ĐỘNG */}
      {tab === "scorers" && (
        <div className="mt-8 max-w-3xl w-full space-y-3">
          <h2 className="text-2xl font-black text-navypro mb-4">Danh hiệu chiếc giày vàng</h2>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm w-full">
            <table className="w-full text-left text-sm">
              <thead className="bg-navypro text-xs uppercase text-white">
                <tr>
                  <th className="px-6 py-3.5 text-center w-20">Hạng</th>
                  <th className="px-4 py-3.5">Cầu thủ</th>
                  <th className="px-4 py-3.5">Đội bóng</th>
                  <th className="px-6 py-3.5 text-center w-32">Bàn thắng</th>
                </tr>
              </thead>
              <tbody>
                {sortedScorers.length > 0 ? (
                  sortedScorers.map((player, index) => (
                    <tr 
                      key={player.id} 
                      className="border-t border-slate-100 odd:bg-slate-50/50 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center font-black">
                        {index === 0 && <span className="text-xl">🥇</span>}
                        {index === 1 && <span className="text-xl">🥈</span>}
                        {index === 2 && <span className="text-xl">🥉</span>}
                        {index > 2 && <span className="text-slate-500">{index + 1}</span>}
                      </td>
                      <td className="px-4 py-4 font-black text-navypro">
                        <div className="flex items-center gap-2">
                          <span className="text-base bg-slate-100 p-1.5 rounded-full">{player.avatar}</span>
                          <div>
                            <div>{player.number != null ? `${player.name} (${player.number})` : player.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-bold text-slate-600">
                        {player.team}
                      </td>
                      <td className="px-6 py-4 text-center text-lg font-black text-amber-600 bg-amber-50/25">
                        {player.goals}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-slate-400 font-medium">
                      Chưa có dữ liệu bàn thắng nào được ghi nhận.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}