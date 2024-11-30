import { useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";

import { useQuery } from "@tanstack/react-query";
import { getMarkets } from "@/app/api/markets/route";
import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  SUPPORTED_LEAGUES,
} from "@/app/constants/Constants";
import { SportMarket } from "@/utils/overtime/types/markets";
import { TradeData } from "@/utils/overtime/types/markets";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { LeagueMap } from "@/app/constants/sports";
import MainBetCard from "./custom/main-bet-card";
import { getTradeDataFromSportMarket } from "@/utils/overtime/ui/helpers";
import StickyHeaderMainBetCard from "./custom/home-sticky-header";

const REFETCH_INTERVAL = 60000 * 3;
type BetListItem = LeagueEnum | SportMarket;

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [, setContext] = useState<FrameContext>();

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {}),
    refetchInterval: REFETCH_INTERVAL,
  });

  useEffect(() => {
    const load = async () => {
      setContext(await sdk.context);
      sdk.actions.ready();
    };
    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  };

  const [userBets, setUserBets] = useAtom(userBetsAtom);

  function handleMarketPress(market: SportMarket, tradeData: TradeData) {
    setUserBets((prevBets) => {
      // Remove any existing bets for this game
      const filteredBets = prevBets.filter(
        (bet) => bet.sportMarket.gameId !== market.gameId
      );

      // Check if the new bet is already selected
      const isNewBetSelected = prevBets.some(
        (bet) =>
          bet.sportMarket.gameId === market.gameId &&
          bet.tradeData.typeId === tradeData.typeId &&
          bet.tradeData.position === tradeData.position
      );

      if (isNewBetSelected) {
        // If the new bet is already selected, just return the filtered bets (removing it)
        return filteredBets;
      } else {
        // If the new bet is not selected, add it to the filtered bets
        return [...filteredBets, { tradeData, sportMarket: market }];
      }
    });
  }

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  if (renderError(marketsIsError)) {
    return <div>Error: {marketsIsError?.message}</div>;
  }

  let SportView;

  if (marketsIsLoading) {
    SportView = <div>Loading...</div>;
  } else if (marketsIsError) {
    SportView = <div>No markets found</div>;
  } else if (marketsData) {
    const betListData: BetListItem[] = SUPPORTED_LEAGUES.reduce(
      (acc, leagueId) => {
        const sport = LeagueMap[leagueId].sport;
        const leagueData = marketsData[sport]?.[leagueId] || [];

        if (leagueData.length > 0) {
          acc.push(leagueId);
          acc.push(...leagueData);
        }

        return acc;
      },
      [] as BetListItem[]
    );

    SportView = (
      <div className="flex flex-col w-full">
        {betListData.map((item, index) => {
          if (typeof item === "number") {
            // League header
            return (
              <div key={index} className="sticky top-0 z-10">
                <StickyHeaderMainBetCard leagueId={item as LeagueEnum} />
              </div>
            );
          } else {
            // Sport market item
            const market = item as SportMarket;
            return (
              <MainBetCard
                key={index}
                sportMarket={market}
                onPress={() => {}}
                onPressOddsButton={(position, marketType) => {
                  const tradeData = getTradeDataFromSportMarket(
                    market,
                    position,
                    marketType
                  );
                  if (tradeData) {
                    handleMarketPress(market, tradeData);
                  }
                }}
              />
            );
          }
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4">
      <h1>bets</h1>
      {SportView}
    </div>
  );
}
