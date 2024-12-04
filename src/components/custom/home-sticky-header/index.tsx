import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { LeagueMap } from "@/app/constants/sports";
import { Skeleton } from "@/components/ui/Skeleton";

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
    <div className="flex flex-row w-full justify-between items-center py-2 ">
      <div className="flex w-3/5 ">
        <span className="text-xl font-semibold">{leagueLabel}</span>
      </div>
      <div className="w-full flex flex-row justify-between">
        <span className="w-3/5 text-center font-semibold">Winner</span>
        <span className="w-3/5 text-center font-semibold">Spread</span>
        <span className="w-3/5 text-center font-semibold">Total</span>
      </div>
    </div>
  );
}

export function StickyHeaderLoader() {
  return (
    <div className="flex flex-row w-full justify-between items-center py-2 ">
      <div className="flex w-3/5">
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="w-full flex flex-row justify-between gap-2">
        <Skeleton className="w-3/5 h-5 " />
        <Skeleton className="w-3/5 h-5 " />
        <Skeleton className="w-3/5 h-5 " />
      </div>
    </div>
  );
}
