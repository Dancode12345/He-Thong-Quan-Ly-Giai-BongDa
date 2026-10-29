import MatchCard from "../components/MatchCard";
import { useTournament } from "../context/TournamentContext";

export default function TeamDetail({ teamId }) {
  const { data, loading } = useTournament();

  if (loading) {
    return <div className="p-10 text-center text-slate-500 font-bold">Đang tải dữ liệu từ database...</div>;
  }

  console.log("🔍 URL đang truyền teamId là:", teamId);
  console.log("📂 Danh sách teams hiện có:", data.teams);

  // Hàm chuyển đổi tiếng Việt có dấu thành slug không dấu (vd: "Công An Tỉnh" -> "cong-an-tinh")
  const slugify = (str) => {
    if (!str) return "";
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-");
  };

  // Giải mã URL và tìm kiếm linh hoạt tuyệt đối
  const decodedTeamId = decodeURIComponent(teamId || "").trim();
  const targetSlug = slugify(decodedTeamId);

  const team = data.teams.find((item) => {
    const itemIdSlug = slugify(item.id);
    const itemShortSlug = slugify(item.shortName);
    const itemNameSlug = slugify(item.name);

    return (
      itemIdSlug === targetSlug ||
      itemShortSlug === targetSlug ||
      itemNameSlug.includes(targetSlug) ||
      String(item.id).toLowerCase() === decodedTeamId.toLowerCase() ||
      String(item.shortName).toLowerCase() === decodedTeamId.toLowerCase()
    );
  });

  // Nếu không tìm thấy, hiện thông báo rõ ràng luôn để biết router truyền thiếu hay thừa
  if (!team) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-8">
          <h2 className="text-2xl font-black text-red-600">Không tìm thấy đội bóng!</h2>
          <p className="mt-2 text-slate-600">Hệ thống nhận diện `teamId` từ URL là: <strong className="text-slate-900">"{teamId}"</strong></p>
          <p className="mt-1 text-sm text-slate-500">Hãy kiểm tra lại cách Router truyền tham số xuống component này.</p>
        </div>
      </main>
    );
  }

  const matches = data.matches.filter((match) => 
    String(match.homeTeamId) === String(team.id) || 
    String(match.awayTeamId) === String(team.id)
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <section className="grid gap-6 md:grid-cols-[320px_1fr]">
        
        {/* THẺ THÔNG TIN ĐỘI BÓNG */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col h-fit">
          <div className="w-full h-64 bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100">
            <img 
              src={team.logo} 
              alt={team.name} 
              className="h-full max-h-48 w-auto object-contain drop-shadow-md"
              onError={(e) => { e.target.src = "/LOGO_NEW/default.png"; }}
            />
          </div>
          
          <div className="p-5">
            <span 
              className="rounded-md px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-sm" 
              style={{ backgroundColor: team.color || "#17A964" }}
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