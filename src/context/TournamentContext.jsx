import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialTournamentData } from "../data/mockData";
import { calculateStandings, getNextMatch } from "../utils/standings";

const STORAGE_KEY = "tnhssv-football-portal";
const TournamentContext = createContext(null);

const readStoredData = () => {
  // Lấy từ localStorage nếu có, nếu không dùng initialTournamentData
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Lỗi đọc localStorage:", e);
    }
  }
  return initialTournamentData; 
};

export function TournamentProvider({ children }) {
  const [data, setData] = useState(readStoredData);

  // 🌟 ĐỒNG BỘ DỮ LIỆU TỪ BACKEND SQLITE API KHI KHỞI CHẠY
  useEffect(() => {
    async function fetchBackendTeams() {
      try {
        const response = await fetch("http://localhost:5000/api/teams");
        if (!response.ok) throw new Error("Không thể kết nối API backend");
        
        const result = await response.json();
        if (result.teams && Array.isArray(result.teams)) {
          // Chuẩn hóa dữ liệu teams từ SQLite khớp với cấu trúc frontend
          const formattedTeams = result.teams.map((team) => {
            const generatedId = team.shortName 
              ? team.shortName.toLowerCase() 
              : team.name.replace(/^FC\s+/i, "").toLowerCase().replace(/\s+/g, "-");

            return {
              ...team,
              id: generatedId,
              group: team.group_name || team.group || "A",
              shortName: team.shortName || team.name.replace(/^FC\s+/i, "").slice(0, 5).toUpperCase(),
              logo: team.logo ? `/LOGO_NEW/${team.logo.trim()}` : "/LOGO_NEW/default.png",
              color: team.color || "#17A964",
              players: Array.isArray(team.players) ? team.players : []
            };
          });

          // Cập nhật đè danh sách teams từ SQLite vào state nhưng giữ nguyên matches, news...
          setData((current) => ({
            ...current,
            teams: formattedTeams
          }));
        }
      } catch (err) {
        console.warn("Không kết nối được Backend SQLite, đang dùng dữ liệu mock/local:", err.message);
      }
    }

    fetchBackendTeams();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const standings = useMemo(() => calculateStandings(data.teams, data.matches), [data.teams, data.matches]);
  const nextMatch = useMemo(() => getNextMatch(data.matches), [data.matches]);

  const updateMatch = (matchId, payload) => {
    setData((current) => ({
      ...current,
      matches: current.matches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              ...payload,
              homeScore: payload.homeScore === "" ? null : Number(payload.homeScore),
              awayScore: payload.awayScore === "" ? null : Number(payload.awayScore)
            }
          : match
      )
    }));
  };

  const addNews = (article) => {
    setData((current) => ({
      ...current,
      news: [
        {
          id: `n-${Date.now()}`,
          category: "BTC",
          createdAt: new Date().toISOString().slice(0, 10),
          ...article
        },
        ...current.news
      ]
    }));
  };

  const addTeam = (team) => {
    setData((current) => ({
      ...current,
      teams: [
        ...current.teams,
        {
          id: team.shortName.toLowerCase().replace(/\s+/g, "-"),
          logo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=400&q=80",
          color: "#17A964",
          players: [],
          ...team
        }
      ]
    }));
  };

  const addPlayer = (teamId, player) => {
    setData((current) => ({
      ...current,
      teams: current.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              players: [
                ...team.players,
                {
                  id: `p-${Date.now()}`,
                  goals: 0,
                  assists: 0,
                  ...player,
                  number: Number(player.number)
                }
              ]
            }
          : team
      )
    }));
  };

  const updatePlayerStats = (teamId, playerId, stats) => {
    setData((current) => ({
      ...current,
      teams: current.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              players: team.players.map((player) =>
                player.id === playerId
                  ? {
                      ...player,
                      goals: Math.max(0, Number(stats.goals)),
                      assists: Math.max(0, Number(stats.assists))
                    }
                  : player
              )
            }
          : team
      )
    }));
  };

  const resetData = () => setData(initialTournamentData);

  const value = {
    data,
    standings,
    nextMatch,
    updateMatch,
    addNews,
    addTeam,
    addPlayer,
    updatePlayerStats,
    resetData
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
}

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) throw new Error("useTournament must be used inside TournamentProvider");
  return context;
};