import { useAtom } from "jotai";
import { userBetsAtom } from "../../../lib/atom/atoms";
import {
  findOddsForMarket,
  formatAmericanOdds,
  negativePlusHelper,
} from "../../../utils/overtime/ui/helpers";
import OddsButton from "./odds-button";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { PositionEnum } from "@/utils/overtime/enums/markets";
import { SportMarket } from "@/utils/overtime/types/markets";

export const MAIN_CARD_MARKETS = [
  MarketTypeEnum.SPREAD,
  MarketTypeEnum.WINNER,
  MarketTypeEnum.TOTAL,
];

interface OddsRowProps {
  sportMarket: SportMarket;
  marketTypes: MarketTypeEnum[];
  position: PositionEnum;
  onPressOddsButton: (index: PositionEnum, marketType: MarketTypeEnum) => void;
}

export default function OddsRow({
  sportMarket,
  marketTypes,
  position,
  onPressOddsButton,
}: OddsRowProps) {
  const [userBets] = useAtom(userBetsAtom);

  const isSelected = (index: number, marketType: MarketTypeEnum) => {
    return userBets.some(
      (bet) =>
        bet.sportMarket.gameId === sportMarket.gameId &&
        bet.tradeData.position === index &&
        bet.tradeData.typeId === marketType
    );
  };

  const marketOdds = marketTypes.reduce((acc, marketType) => {
    const oddsData = findOddsForMarket(sportMarket, marketType);
    if (oddsData) {
      acc[marketType] = oddsData;
    }
    return acc;
  }, {} as Record<MarketTypeEnum, ReturnType<typeof findOddsForMarket>>);

  return (
    <div className="flex w-full">
      <div className="flex flex-row gap-1 w-full">
        {/* Winner */}
        <OddsButton
          line={formatAmericanOdds(
            marketOdds[MarketTypeEnum.WINNER]?.odds[position].american ?? 0
          )}
          onPress={() => onPressOddsButton(position, MarketTypeEnum.WINNER)}
          selected={isSelected(position, MarketTypeEnum.WINNER)}
        />

        {/* Spread */}
        <OddsButton
          line={formatAmericanOdds(
            marketOdds[MarketTypeEnum.SPREAD]?.odds[position].american ?? 0
          )}
          onPress={() => onPressOddsButton(position, MarketTypeEnum.SPREAD)}
          selected={isSelected(position, MarketTypeEnum.SPREAD)}
          label={negativePlusHelper(
            (position === PositionEnum.AWAY ? -1 : 1) *
              (marketOdds[MarketTypeEnum.SPREAD]?.line ?? 0)
          )}
        />

        {/* Total */}
        <OddsButton
          line={formatAmericanOdds(
            marketOdds[MarketTypeEnum.TOTAL]?.odds[position].american ?? 0
          )}
          onPress={() => onPressOddsButton(position, MarketTypeEnum.TOTAL)}
          selected={isSelected(position, MarketTypeEnum.TOTAL)}
          label={
            position === PositionEnum.AWAY
              ? `U${marketOdds[MarketTypeEnum.TOTAL]?.line}`
              : `O${marketOdds[MarketTypeEnum.TOTAL]?.line}`
          }
        />
      </div>
    </div>
  );
}
