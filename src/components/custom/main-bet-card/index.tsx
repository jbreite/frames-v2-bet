import { SportMarket } from "@/utils/overtime/types/markets";
// import { getImage } from "@/utils/overtime/ui/images";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { convertUnixToFormattedDate } from "@/utils/overtime/ui/date";
import OddsRow, { MAIN_CARD_MARKETS } from "./odds-row";
import { PositionEnum } from "@/utils/overtime/enums/markets";
import TeamInfo from "./team-info";
import TeamDivider from "./team-divider";
import { getTeamImageSource } from "@/utils/overtime/ui/images";

interface MainBetCardProps {
  sportMarket: SportMarket;
  onPress: () => void;
  onPressOddsButton: (index: PositionEnum, marketType: MarketTypeEnum) => void;
}

export default function MainBetCard({
  sportMarket,
  onPress,
  onPressOddsButton,
}: MainBetCardProps) {
  const homeTeamImage = getTeamImageSource(
    sportMarket.homeTeam,
    sportMarket.leagueId
  );
  const awayTeamImage = getTeamImageSource(
    sportMarket.awayTeam,
    sportMarket.leagueId
  );

  const formattedDate = convertUnixToFormattedDate(sportMarket.maturity);

  return (
    <div onClick={onPress} className="pb-4 flex flex-col gap-2 relative ">
      <div className="flex flex-col w-full gap-1 ">
        <div className="flex flex-row gap-1 ">
          <TeamInfo teamImage={awayTeamImage} teamName={sportMarket.awayTeam} />
          <OddsRow
            sportMarket={sportMarket}
            marketTypes={MAIN_CARD_MARKETS}
            position={PositionEnum.AWAY}
            onPressOddsButton={onPressOddsButton}
          />
        </div>

        <TeamDivider />

        <div className="flex flex-row gap-1">
          <TeamInfo teamImage={homeTeamImage} teamName={sportMarket.homeTeam} />
          <OddsRow
            sportMarket={sportMarket}
            marketTypes={MAIN_CARD_MARKETS}
            position={PositionEnum.HOME}
            onPressOddsButton={onPressOddsButton}
          />
        </div>
      </div>

      <span className="font-medium">{formattedDate}</span>
    </div>
  );
}
