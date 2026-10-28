
import { useEffect, useState } from "react";
import TeamCard from "../components/TeamCard";

const API_URL = "http://localhost:5000/api/teams";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTeams() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Không thể tải danh sách đội bóng");
        }

        const result = await response.json();

        if (!Array.isArray(result.teams)) {
          throw new Error("Dữ liệu API không hợp lệ");
        }

        // Chuyển dữ liệu SQLite sang định dạng TeamCard
        const formattedTeams = result.teams.map((team) => ({
          ...team,
          group: team.group_name,
          shortName:
            team.shortName ||
            team.name
              .replace(/^FC\s+/i, "")
              .split(/\s+/)
              .map((word) => word.charAt(0))
              .join("")
              .slice(0, 5)
              .toUpperCase(),
          logo: team.logo || "/logodoi/default.jpg",
          color: team.color || "#17A964",
          players: Array.isArray(team.players) ? team.players : [],
        }));

        setTeams(formattedTeams);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Lỗi kết nối API:", err);
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTeams();

    return () => controller.abort();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <p className="text-sm font-black uppercase text-pitch">
        Danh sách đội bóng
      </p>

      <h1 className="text-4xl font-black text-navypro">
        Các đội tham gia giải
      </h1>

      {loading && (
        <p className="mt-6 text-slate-500">
          Đang tải danh sách đội bóng...
        </p>
      )}

      {error && (
        <p className="mt-6 rounded-lg bg-red-100 p-4 text-red-600">
          Lỗi: {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <p className="mt-4 text-slate-600">
            Tổng số câu lạc bộ: {teams.length}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>

          {teams.length === 0 && (
            <p>Chưa có câu lạc bộ nào.</p>
          )}
        </>
      )}
    </main>
  );
}
