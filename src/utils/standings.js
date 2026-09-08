const resultFor = (goalsFor, goalsAgainst) => {
  if (goalsFor > goalsAgainst) return "win";
  if (goalsFor < goalsAgainst) return "loss";
  return "draw";
};

export function calculateStandings(teams, matches) {
  const table = teams.reduce((acc, team) => {
    acc[team.id] = {
      id: team.id,
      teamId: team.id,
      name: team.name,
      shortName: team.shortName,
      logo: team.logo,
      group: team.group,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    };
    return acc;
  }, {});

  matches
    .filter((match) => match.status === "finished")
    .forEach((match) => {
      const home = table[match.homeTeamId];
      const away = table[match.awayTeamId];
      if (!home || !away) return;

      const homeScore = Number(match.homeScore);
      const awayScore = Number(match.awayScore);
      if (Number.isNaN(homeScore) || Number.isNaN(awayScore)) return;

      home.played += 1;
      away.played += 1;
      home.goalsFor += homeScore;
      home.goalsAgainst += awayScore;
      away.goalsFor += awayScore;
      away.goalsAgainst += homeScore;

      const homeResult = resultFor(homeScore, awayScore);
      if (homeResult === "win") {
        home.won += 1;
        away.lost += 1;
        home.points += 3;
      } else if (homeResult === "loss") {
        away.won += 1;
        home.lost += 1;
        away.points += 3;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }

      home.goalDifference = home.goalsFor - home.goalsAgainst;
      away.goalDifference = away.goalsFor - away.goalsAgainst;
    });

  return Object.values(table).sort((a, b) => {
    return (
      b.points - a.points ||
      b.goalDifference - a.goalDifference ||
      b.goalsFor - a.goalsFor ||
      a.name.localeCompare(b.name)
    );
  });
}

export const getTeam = (teams, id) => teams.find((team) => team.id === id);

export const getNextMatch = (matches) => {
  const now = new Date();
  return matches
    .filter((match) => match.status !== "finished")
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    .find((match) => new Date(match.kickoff) >= now) || matches.find((match) => match.status === "live");
};
