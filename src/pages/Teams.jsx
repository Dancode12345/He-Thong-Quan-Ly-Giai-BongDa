import TeamCard from "../components/TeamCard";
import { useTournament } from "../context/TournamentContext";

export default function Teams() {
  const { data } = useTournament();
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <p className="text-sm font-black uppercase text-pitch">Danh sách đội bóng</p>
      <h1 className="text-4xl font-black text-navypro">Các đội tham gia giải</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.teams.map((team) => <TeamCard key={team.id} team={team} />)}
      </div>
    </main>
  );
}
