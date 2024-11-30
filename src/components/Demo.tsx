import { useEffect, useCallback, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import {
  useAccount,
  useSendTransaction,
  useSignMessage,
  useSignTypedData,
  useWaitForTransactionReceipt,
  useDisconnect,
  useConnect,
} from "wagmi";

import { config } from "@/components/providers/WagmiProvider";
import { Button } from "@/components/ui/Button";
import { truncateAddress } from "@/lib/truncateAddress";
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

const REFETCH_INTERVAL = 60000 * 3;
type BetListItem = LeagueEnum | SportMarket;

export default function Demo() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { address, isConnected } = useAccount();

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {}),
    refetchInterval: REFETCH_INTERVAL,
  });

  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

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
      <div className="flex flex-col">
        {betListData.map((item, index) => {
          if (typeof item === 'number') {
            // League header
            return (
              <div key={index} className="py-2 px-4 bg-gray-100 font-semibold">
                {LeagueMap[item as LeagueEnum].label}
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
                  handleMarketPress(market, {
                    typeId: marketType,
                    position: position,
                    line: 0,
                  });
                }}
              />
            );
          }
        })}
      </div>
    );
  }

  return (
    <div>
      <h1>bets</h1>
      {SportView}
    </div>
  );
}
