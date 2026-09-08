import MatchCard from "../components/MatchCard";
import { useTournament } from "../context/TournamentContext";

export default function TeamDetail({ teamId }) {
  const { data } = useTournament();
  const team = data.teams.find((item) => item.id === teamId) || data.teams[0];
  const matches = data.matches.filter((match) => match.homeTeamId === team.id || match.awayTeamId === team.id);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <section className="grid gap-6 md:grid-cols-[320px_1fr]">
        
        {/* THẺ THÔNG TIN ĐỘI BÓNG */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-fit">
          {/* Hộp chứa Logo - Thay đổi giúp ảnh tròn vừa vặn, không bị phóng to vỡ hình */}
          <div className="w-full h-64 bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100">
            <img 
              src={team.logo || "/logodoi/default.jpg"} 
              alt={team.name} 
              className="h-full max-h-48 w-auto object-contain drop-shadow-md"
              onError={(e) => { e.target.src = "/logodoi/default.jpg"; }}
            />
          </div>
          
          <div className="p-5">
            {/* Badge chữ viết tắt: Thêm chữ trắng text-white để nổi bật trên mọi màu nền của Đội bóng */}
            <span 
              className="rounded-md px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-sm" 
              style={{ backgroundColor: team.color || "#1e293b" }}
            >
              {team.shortName}
            </span>
            <h1 className="mt-4 text-3xl font-black text-navypro uppercase tracking-wide">{team.name}</h1>
          </div>
        </div>

        {/* DANH SÁCH CẦU THỦ */}
        <div>
          <h2 className="text-2xl font-black text-navypro">Danh sách cầu thủ</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {team.players && team.players.length > 0 ? (
              team.players.map((player) => (
                <div key={player.id} className="grid grid-cols-[60px_1fr_110px] items-center border-t border-slate-100 p-4 first:border-t-0 hover:bg-slate-50/50 transition-colors">
                  <span className="text-2xl font-black text-pitch">#{player.number}</span>
                  <span className="font-black text-navypro">{player.name}</span>
                  <span className="text-sm font-bold text-slate-500">{player.position}</span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-sm font-medium text-slate-400">
                Chưa cập nhật danh sách cầu thủ cho đội bóng này
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LỊCH SỬ THI ĐẤU */}
      <section className="mt-10">
        <h2 className="text-2xl font-black text-navypro">Lịch sử thi đấu</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {matches.length > 0 ? (
            matches.map((match) => <MatchCard key={match.id} match={match} teams={data.teams} />)
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm font-medium text-slate-400 bg-slate-50/30">
              Đội bóng chưa có trận đấu nào diễn ra
            </div>
          )}
        </div>
      </section>
    </main>
  );
}