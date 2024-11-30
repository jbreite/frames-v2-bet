import { LeagueEnum } from "../enums/sport";
import { getLeagueLabel } from "./sportsHelpers";
import { SUPPORTED_LEAGUES } from "@/app/constants/Constants";

export const getTeamImageSource = (team: string, league: LeagueEnum) => {
  let leagueLabel = getLeagueLabel(league);
  console.log("leagueLabel", leagueLabel);
  console.log("team", team);

  if (leagueLabel === "NCAA Football") {
    leagueLabel = "ncaaf";
  }

  // If league is not supported, return default logo
  if (!SUPPORTED_LEAGUES.includes(league)) {
    return "/logos/default.png";
  }

  // For supported leagues, return the standardized path
  return `/logos/${leagueLabel}/${team
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase()}.webp`;
};
