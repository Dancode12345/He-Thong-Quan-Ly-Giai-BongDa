import { Save, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import MatchCard from "../components/MatchCard";
import { useTournament } from "../context/TournamentContext";
import { getTeam } from "../utils/standings";

export default function AdminDashboard() {
  const { data, updateMatch, addNews, addTeam, addPlayer, updatePlayerStats, resetData } = useTournament();
  const [selectedMatch, setSelectedMatch] = useState(data.matches[0]?.id);
  const match = useMemo(() => data.matches.find((item) => item.id === selectedMatch) || data.matches[0], [data.matches, selectedMatch]);
  const [matchForm, setMatchForm] = useState(() => ({
    status: match?.status || "scheduled",
    homeScore: match?.homeScore ?? "",
    awayScore: match?.awayScore ?? ""
  }));
  const [newsForm, setNewsForm] = useState({ title: "", content: "", imageUrl: "" });
  const [teamForm, setTeamForm] = useState({ name: "", shortName: "", logo: "", color: "#17A964" });
  const [playerForm, setPlayerForm] = useState({ teamId: data.teams[0]?.id, name: "", number: "", position: "Tiền đạo" });

  const syncMatch = (id) => {
    const next = data.matches.find((item) => item.id === id);
    setSelectedMatch(id);
    setMatchForm({ status: next.status, homeScore: next.homeScore ?? "", awayScore: next.awayScore ?? "" });
  };

  const saveMatch = (event) => {
    event.preventDefault();
    updateMatch(match.id, matchForm);
  };

  const saveNews = (event) => {
    event.preventDefault();
    if (!newsForm.title.trim()) return;
    addNews(newsForm);
    setNewsForm({ title: "", content: "", imageUrl: "" });
  };

  const saveTeam = (event) => {
    event.preventDefault();
    if (!teamForm.name.trim() || !teamForm.shortName.trim()) return;
    addTeam(teamForm);
    setTeamForm({ name: "", shortName: "", logo: "", color: "#17A964" });
  };

  const savePlayer = (event) => {
    event.preventDefault();
    if (!playerForm.name.trim()) return;
    addPlayer(playerForm.teamId, playerForm);
    setPlayerForm({ ...playerForm, name: "", number: "" });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase text-pitch">BTC Dashboard</p>
          <h1 className="text-4xl font-black text-navypro">Trang quản trị giải đấu</h1>
        </div>
        <button onClick={resetData} className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2 text-sm font-black text-navypro">
          <RotateCcw size={16} /> Khôi phục dữ liệu mẫu
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-navypro">Cập nhật trận đấu</h2>
          <form onSubmit={saveMatch} className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-600">
              Chọn trận
              <select value={selectedMatch} onChange={(event) => syncMatch(event.target.value)} className="rounded border border-slate-300 px-3 py-2">
                {data.matches.map((item) => {
                  const home = getTeam(data.teams, item.homeTeamId);
                  const away = getTeam(data.teams, item.awayTeamId);
                  return <option key={item.id} value={item.id}>{item.round}: {home?.shortName} vs {away?.shortName}</option>;
                })}
              </select>
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-2 text-sm font-bold text-slate-600">
                Trạng thái
                <select value={matchForm.status} onChange={(event) => setMatchForm({ ...matchForm, status: event.target.value })} className="rounded border border-slate-300 px-3 py-2">
                  <option value="scheduled">Chưa đá</option>
                  <option value="live">Đang đá</option>
                  <option value="finished">Đã kết thúc</option>
                </select>
              </label>
              <Input label="Bàn đội A" type="number" value={matchForm.homeScore} onChange={(value) => setMatchForm({ ...matchForm, homeScore: value })} />
              <Input label="Bàn đội B" type="number" value={matchForm.awayScore} onChange={(value) => setMatchForm({ ...matchForm, awayScore: value })} />
            </div>
            <button className="inline-flex w-fit items-center gap-2 rounded bg-pitch px-4 py-2 text-sm font-black text-white">
              <Save size={16} /> Lưu kết quả
            </button>
          </form>
          <div className="mt-5">
            <MatchCard match={match} teams={data.teams} />
          </div>
        </section>

        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-navypro">Đăng tin mới</h2>
          <form onSubmit={saveNews} className="mt-5 grid gap-4">
            <Input label="Tiêu đề" value={newsForm.title} onChange={(value) => setNewsForm({ ...newsForm, title: value })} />
            <Input label="Image URL" value={newsForm.imageUrl} onChange={(value) => setNewsForm({ ...newsForm, imageUrl: value })} />
            <label className="grid gap-2 text-sm font-bold text-slate-600">
              Nội dung
              <textarea value={newsForm.content} onChange={(event) => setNewsForm({ ...newsForm, content: event.target.value })} className="min-h-28 rounded border border-slate-300 px-3 py-2" />
            </label>
            <button className="rounded bg-navypro px-4 py-2 text-sm font-black text-white">Đăng bài</button>
          </form>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-navypro">Quản lý đội bóng</h2>
          <form onSubmit={saveTeam} className="mt-5 grid gap-4 md:grid-cols-2">
            <Input label="Tên đội" value={teamForm.name} onChange={(value) => setTeamForm({ ...teamForm, name: value })} />
            <Input label="Tên ngắn" value={teamForm.shortName} onChange={(value) => setTeamForm({ ...teamForm, shortName: value })} />
            <Input label="Logo URL" value={teamForm.logo} onChange={(value) => setTeamForm({ ...teamForm, logo: value })} />
            <Input label="Màu đội" type="color" value={teamForm.color} onChange={(value) => setTeamForm({ ...teamForm, color: value })} />
            <button className="rounded bg-pitch px-4 py-2 text-sm font-black text-white md:col-span-2">Thêm đội</button>
          </form>

          <form onSubmit={savePlayer} className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-600">
              Đội
              <select value={playerForm.teamId} onChange={(event) => setPlayerForm({ ...playerForm, teamId: event.target.value })} className="rounded border border-slate-300 px-3 py-2">
                {data.teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
              </select>
            </label>
            <Input label="Tên cầu thủ" value={playerForm.name} onChange={(value) => setPlayerForm({ ...playerForm, name: value })} />
            <Input label="Số áo" type="number" value={playerForm.number} onChange={(value) => setPlayerForm({ ...playerForm, number: value })} />
            <Input label="Vị trí" value={playerForm.position} onChange={(value) => setPlayerForm({ ...playerForm, position: value })} />
            <button className="rounded bg-navypro px-4 py-2 text-sm font-black text-white md:col-span-2">Thêm cầu thủ</button>
          </form>
        </section>

        <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black text-navypro">Cập nhật thống kê</h2>
          <div className="mt-5 max-h-[520px] overflow-y-auto pr-2">
            {data.teams.map((team) => (
              <div key={team.id} className="mb-5">
                <h3 className="mb-2 font-black text-pitch">{team.name}</h3>
                <div className="grid gap-2">
                  {team.players.map((player) => (
                    <div key={player.id} className="grid grid-cols-[1fr_80px_80px] items-center gap-2 rounded bg-slate-50 p-3">
                      <span className="text-sm font-black text-navypro">#{player.number} {player.name}</span>
                      <input aria-label="Bàn thắng" type="number" value={player.goals} onChange={(event) => updatePlayerStats(team.id, player.id, { goals: event.target.value, assists: player.assists })} className="rounded border border-slate-300 px-2 py-1" />
                      <input aria-label="Kiến tạo" type="number" value={player.assists} onChange={(event) => updatePlayerStats(team.id, player.id, { goals: player.goals, assists: event.target.value })} className="rounded border border-slate-300 px-2 py-1" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-600">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="rounded border border-slate-300 px-3 py-2" />
    </label>
  );
}
