import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { LeagueMap } from "@/app/constants/sports";

interface StickyHeaderMainBetCardProps {
  leagueId: LeagueEnum;
}

export default function StickyHeaderMainBetCard({
  leagueId,
}: StickyHeaderMainBetCardProps) {
  let leagueLabel = LeagueMap[leagueId].label;
  if (LeagueMap[leagueId].label === "NCAA Football") {
    leagueLabel = "NCAAF";
  }

  return (
    <div className="flex flex-row justify-between items-center py-2 px-6 bg-white">
      <div className="flex w-40">
        <span className="text-xl font-semibold">{leagueLabel}</span>
      </div>
      <div className="w-full flex flex-row justify-between">
        <span className="w-full text-center font-semibold">Winner</span>
        <span className="w-full text-center font-semibold">Spread</span>
        <span className="w-full text-center font-semibold">Total</span>
      </div>
    </div>
  );
}
