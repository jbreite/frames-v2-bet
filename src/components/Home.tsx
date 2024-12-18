import { useCallback, useEffect, useState } from "react";
import sdk, { type FrameContext } from "@farcaster/frame-sdk";
import { useQuery } from "@tanstack/react-query";
import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  INITIAL_BET_AMOUNT,
  SUPPORTED_LEAGUES,
} from "@/app/constants/Constants";
import { SportMarket } from "@/utils/overtime/types/markets";
import { TradeData } from "@/utils/overtime/types/markets";
import { userBetsAtom } from "@/lib/atom/atoms";
import { useAtom } from "jotai";
import { LeagueEnum } from "@/utils/overtime/enums/sport";
import { LeagueMap } from "@/app/constants/sports";
import MainBetCard, { MainBetCardLoader } from "./custom/main-bet-card";
import {
  getTradeDataFromSportMarket,
  updateBetWithNewMarketData,
} from "@/utils/overtime/ui/helpers";
import StickyHeaderMainBetCard, {
  StickyHeaderLoader,
} from "./custom/home-sticky-header";
import BetTab from "./custom/bet-tab";
import { useAccount } from "wagmi";
import { getMarkets } from "@/utils/overtime/queries/get-markets";
import HomeHeader, { WalletControls } from "./custom/home-header";
import { usePostHog } from "posthog-js/react";
import ToggleBar from "./custom/tabs";
import History from "@/components/custom/history";
import { usePlaceBet } from "@/lib/hooks/usePlaceBet";
import { queryClient } from "./providers/WagmiProvider";

const REFETCH_INTERVAL = 60000 * 3;
type BetListItem = LeagueEnum | SportMarket;

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<FrameContext>();
  const { isConnected, address } = useAccount();
  const posthog = usePostHog();

  const {
    data: marketsData,
    isLoading: marketsIsLoading,
    error: marketsIsError,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: () => getMarkets(CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM, {}),
    refetchInterval: REFETCH_INTERVAL,
  });

  // Handle SDK initialization
  useEffect(() => {
    const load = async () => {
      const newContext = await sdk.context;
      setContext(newContext);
      sdk.actions.ready();
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const identifyUser = useCallback(
    (username: string) => {
      posthog.identify(username);
    },
    [posthog]
  ); // posthog is now referenced in closure

  useEffect(() => {
    if (context?.user?.username) {
      identifyUser(context.user.username);
    }
  }, [context?.user?.username, identifyUser]);

  const renderError = (error: Error | null) => {
    if (!error) return null;
    return <div className="text-red-500 text-xs mt-1">{error.message}</div>;
  };

  const [userBets, setUserBets] = useAtom(userBetsAtom);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"bets" | "history">("bets");
  const [betAmount, setBetAmount] = useState(INITIAL_BET_AMOUNT);

  const { placeBet, isConfirmingTransaction, isConfirmedTransaction, hash } =
    usePlaceBet();

  const onBetSuccess = useCallback(() => {
    console.log("Bet placed successfully!");
    setUserBets([]);
    setBetAmount(INITIAL_BET_AMOUNT);
    setIsDrawerOpen(false);
    setActiveTab("history");
    window.scrollTo({ top: 0, behavior: "smooth" });
    queryClient.invalidateQueries({ queryKey: ["history"] });
  }, [setUserBets, setBetAmount, setIsDrawerOpen, setActiveTab]); // Empty dependency array since these functions are stable

  useEffect(() => {
    if (isConfirmedTransaction && hash) {
      onBetSuccess();
    }
  }, [isConfirmedTransaction, hash, onBetSuccess]);

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
        setIsDrawerOpen(true);
        return [...filteredBets, { tradeData, sportMarket: market }];
      }
    });
  }

  useEffect(() => {
    if (userBets.length === 0) {
      setIsDrawerOpen(false);
    }
  }, [userBets.length]);

  //Not sure there is a better way to do this, but somwething for now
  useEffect(() => {
    if (marketsData && userBets.length !== 0) {
      console.log("Refreshing userBets Atom Data");
      setUserBets((prevBets) => {
        const allNewMarkets = Object.values(marketsData).flatMap(
          (sportMarkets) => Object.values(sportMarkets).flat()
        );
        return prevBets.map((bet) =>
          updateBetWithNewMarketData(bet, allNewMarkets)
        );
      });
    }
  }, [marketsData, setUserBets, userBets.length]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  if (renderError(marketsIsError)) {
    return <div>Error: {marketsIsError?.message}</div>;
  }

  let SportView;

  if (marketsIsLoading) {
    SportView = (
      <div className="flex flex-col gap-4 w-full">
        <StickyHeaderLoader />
        <MainBetCardLoader />
      </div>
    );
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
              <div key={index} className="sticky top-0 z-10 bg-background">
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
    <>
      <div className="flex flex-col w-full px-4 pt-4 gap-4">
        <div className="flex items-center gap-2 justify-between">
          <HomeHeader
            isConnected={isConnected}
            pfpUrl={context?.user?.pfpUrl}
            username={context?.user?.username || ""}
            address={address as `0x${string}`}
            setIsWalletOpen={setIsWalletOpen}
          />
        </div>
        <ToggleBar activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "bets" ? (
          <div className="flex flex-col w-full ">{SportView}</div>
        ) : (
          <History address={address} />
        )}
      </div>
      <BetTab
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        placeBet={placeBet}
        isConfirmingTransaction={isConfirmingTransaction}
      />
      <WalletControls
        isOpen={isWalletOpen}
        setIsOpen={setIsWalletOpen}
        pfpUrl={context?.user?.pfpUrl}
        address={address as `0x${string}`}
      />
    </>
  );
}
