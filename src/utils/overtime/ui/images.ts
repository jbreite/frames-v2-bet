import { LeagueEnum } from "../enums/sport";
import { getLeagueLabel } from "./sportsHelpers";
import { SUPPORTED_LEAGUES } from "@/app/constants/Constants";

export const getTeamImageSource = (team: string, league: LeagueEnum) => {
  let leagueLabel = getLeagueLabel(league).toLowerCase();

  if (leagueLabel === "ncaa football") {
    leagueLabel = "ncaaf";
  }

  if (!SUPPORTED_LEAGUES.includes(league)) {
    return `/logos/default.png`;
  }

  return `/logos/${leagueLabel}/${team
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("/", "-")
    .toLowerCase()}.webp`;
};
