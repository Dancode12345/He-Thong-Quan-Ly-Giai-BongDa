import { useTournament } from "../context/TournamentContext";

export default function Stats() {
  const { data } = useTournament();

  const scorerMap = {};
  data.matches.forEach((match) => {
    match.scorers?.forEach((scorer) => {
      const key = `${scorer.name.trim()}_${scorer.teamId}`;
      const count = Number(scorer.goals ?? 1);
      if (scorerMap[key]) {
        scorerMap[key].goals += count;
      } else {
        const team = data.teams.find((item) => item.id === scorer.teamId);
        scorerMap[key] = {
          id: key,
          name: scorer.name.trim(),
          number: scorer.number ?? null,
          team: team?.shortName || team?.name || "Đội bóng",
          goals: count,
          assists: 0,
          position: "-",
        };
      }
    });
  });

  const topScorers = Object.values(scorerMap).sort((a, b) => b.goals - a.goals).slice(0, 10);
  const topAssists = [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <p className="text-sm font-black uppercase text-pitch">Player Stats</p>
      <h1 className="text-4xl font-black text-navypro">Thống kê cá nhân</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <StatsList title="Vua phá lưới" rows={topScorers} field="goals" suffix="bàn" />
        <StatsList title="Vua kiến tạo" rows={topAssists} field="assists" suffix="kiến tạo" />
      </div>
    </main>
  );
}

function StatsList({ title, rows, field, suffix }) {
  return (
    <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-black text-navypro">{title}</h2>
      <div className="mt-4 grid gap-3">
        {rows.map((player, index) => (
          <div key={player.id} className="grid grid-cols-[44px_1fr_auto] items-center gap-3 rounded bg-slate-50 p-3">
            <span className="grid h-9 w-9 place-items-center rounded bg-navypro text-sm font-black text-white">{index + 1}</span>
            <div>
              <p className="font-black text-navypro">{player.name}</p>
              <span className="text-xs font-bold text-slate-500">
                {player.team}
                {player.number != null ? ` · #${player.number}` : ""}
                {player.position ? ` · ${player.position}` : ""}
              </span>
            </div>
            <span className="rounded bg-limeflash px-3 py-1 text-sm font-black text-navypro">{player[field]} {suffix}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
