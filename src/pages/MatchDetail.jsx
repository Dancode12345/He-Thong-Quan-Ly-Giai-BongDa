import { useMemo } from "react";
import { useTournament } from "../context/TournamentContext";

export default function MatchDetail({ matchId }) {
  const { data } = useTournament();

  const match = useMemo(() => data.matches.find((item) => item.id === matchId), [data.matches, matchId]);
  const homeTeam = useMemo(() => data.teams.find((team) => team.id === match?.homeTeamId), [data.teams, match?.homeTeamId]);
  const awayTeam = useMemo(() => data.teams.find((team) => team.id === match?.awayTeamId), [data.teams, match?.awayTeamId]);

  if (!match) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
        <p className="text-lg font-black text-slate-600">Không tìm thấy trận đấu.</p>
      </main>
    );
  }

  const homeScorers = match.scorers?.filter((item) => item.teamId === match.homeTeamId) || [];
  const awayScorers = match.scorers?.filter((item) => item.teamId === match.awayTeamId) || [];
  const homeCards = match.cards?.filter((item) => item.teamId === match.homeTeamId) || [];
  const awayCards = match.cards?.filter((item) => item.teamId === match.awayTeamId) || [];
  const starImage = match.starPlayer?.image || "/gallery/20nam.jpg";
  const playerImageFallback = "/gallery/20nam.jpg";
  const highlightVideoPath = match.highlightVideo || "";
  const highlightVideo = highlightVideoPath.startsWith("/") ? highlightVideoPath : `/${highlightVideoPath}`;

  const formatScorerLabel = (scorer) => {
    const jersey = scorer.number != null ? ` (${scorer.number})` : "";
    const goalCount = Number(scorer.goals ?? 1);
    let goalSuffix = "";

    if (scorer.goalType === "OG") {
      goalSuffix = " OG";
    } else if (goalCount > 1) {
      goalSuffix = ` x${goalCount}`;
    }

    return `${scorer.name || "Cầu thủ"}${jersey}${goalSuffix}`;
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_80px_-30px_rgba(15,23,42,0.35)]">
        <div className="border-b border-slate-200 bg-gradient-to-r from-navypro via-slate-900 to-slate-800 px-6 py-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-limeflash">Chi tiết trận đấu</p>
              <h1 className="mt-2 text-3xl font-black">{homeTeam?.name || "Đội nhà"} vs {awayTeam?.name || "Đội khách"}</h1>
              <p className="mt-2 text-sm font-semibold text-slate-300">{match.round}</p>
            </div>
            <a href="#/match-center" className="rounded-full bg-white px-4 py-2 text-sm font-black text-navypro">Quay lại lịch</a>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-inner">
            <div className="flex items-center gap-3">
              <img src={homeTeam?.logo || "/logodoi/default.jpg"} alt="" className="h-16 w-16 rounded-full border border-slate-200 object-cover" />
              <div>
                <p className="text-lg font-black text-navypro">{homeTeam?.name || "Đội nhà"}</p>
                <p className="text-sm font-semibold text-slate-500">{homeTeam?.shortName || "HOME"}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl bg-navypro px-6 py-4 text-white shadow-sm">
              <div className="text-center">
                <p className="text-4xl font-black leading-none">{match.homeScore ?? 0}</p>
              </div>
              <div className="px-2 text-xs font-black uppercase tracking-[0.25em] text-slate-300">-</div>
              <div className="text-center">
                <p className="text-4xl font-black leading-none">{match.awayScore ?? 0}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-black text-navypro">{awayTeam?.name || "Đội khách"}</p>
                <p className="text-sm font-semibold text-slate-500">{awayTeam?.shortName || "AWAY"}</p>
              </div>
              <img src={awayTeam?.logo || "/logodoi/default.jpg"} alt="" className="h-16 w-16 rounded-full border border-slate-200 object-cover" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <h2 className="text-lg font-black text-navypro">{homeTeam?.name || "Đội nhà"}</h2>
                  </div>
                  <div className="mt-4 space-y-3">
                    {homeScorers.length > 0 ? homeScorers.map((scorer, index) => (
                      <div key={`${scorer.name}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <p className="font-black text-slate-800">{formatScorerLabel(scorer)}</p>
                      </div>
                    )) : <p className="text-sm text-slate-500">Chưa có cầu thủ ghi bàn.</p>}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <h2 className="text-lg font-black text-navypro">{awayTeam?.name || "Đội khách"}</h2>
                  </div>
                  <div className="mt-4 space-y-3">
                    {awayScorers.length > 0 ? awayScorers.map((scorer, index) => (
                      <div key={`${scorer.name}-${index}`} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <p className="font-black text-slate-800">{formatScorerLabel(scorer)}</p>
                      </div>
                    )) : <p className="text-sm text-slate-500">Chưa có cầu thủ ghi bàn.</p>}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black text-navypro">Thẻ phạt {homeTeam?.shortName || "đội nhà"}</h2>
                  <div className="mt-4 space-y-3">
                    {homeCards.length > 0 ? homeCards.map((card, index) => (
                      <div key={`${card.name}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <div>
                          <p className="font-black text-slate-800">{card.name}</p>
                          <p className="text-sm text-slate-500">{card.minute ? `Phút ${card.minute}` : "Thẻ"}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-sm font-black ${card.type === "yellow" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {card.type === "yellow" ? "🟨 Thẻ vàng" : "🟥 Thẻ đỏ"}
                        </span>
                      </div>
                    )) : <p className="text-sm text-slate-500">Không có thẻ phạt.</p>}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black text-navypro">Thẻ phạt {awayTeam?.shortName || "đội khách"}</h2>
                  <div className="mt-4 space-y-3">
                    {awayCards.length > 0 ? awayCards.map((card, index) => (
                      <div key={`${card.name}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                        <div>
                          <p className="font-black text-slate-800">{card.name}</p>
                          <p className="text-sm text-slate-500">{card.minute ? `Phút ${card.minute}` : "Thẻ"}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-sm font-black ${card.type === "yellow" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {card.type === "yellow" ? "🟨 Thẻ vàng" : "🟥 Thẻ đỏ"}
                        </span>
                      </div>
                    )) : <p className="text-sm text-slate-500">Không có thẻ phạt.</p>}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-navypro">Cầu thủ xuất sắc trận</h2>
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <div className="flex justify-center bg-slate-100 p-4">
                    <div className="h-56 w-full max-w-[280px] overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={starImage}
                        alt={match.starPlayer?.name || "Star player"}
                        className="h-full w-full object-contain object-center"
                        onError={(e) => {
                          e.target.src = playerImageFallback;
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-black text-slate-800">{match.starPlayer?.name || "Chưa cập nhật"}</p>
                    <p className="mt-1 text-sm text-slate-500">{match.starPlayer?.team || "Đội chưa xác định"}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-navypro">Highlight video</h2>
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  {highlightVideo ? (
                    <div className="relative bg-black">
                      <video
                        className="w-full"
                        controls
                        preload="metadata"
                        playsInline
                        crossOrigin="anonymous"
                      >
                        <source src={highlightVideo} type="video/mp4" />
                        <track kind="captions" srcLang="vi" label="Phụ đề" src="" />
                        Trình duyệt của bạn không hỗ trợ phát video.
                      </video>
                    </div>
                  ) : (
                    <div className="flex min-h-[220px] items-center justify-center p-6 text-center text-sm font-semibold text-slate-500">
                      Chưa có video highlight.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
