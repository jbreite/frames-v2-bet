import { QuoteData } from "@/app/api/quote/route";
import { calculateBetOutcome } from "@/utils/overtime/ui/betTabHelpers";
import { extractAmericanOddsFromBets } from "@/utils/overtime/ui/betTabHelpers";
import { userBetsAtom } from "@/lib/atom/atoms";
import { formatAmericanOdds } from "@/utils/overtime/ui/betTabHelpers";
import {
  formatCurrency,
  isSuccessfulQuoteObject,
} from "@/utils/overtime/ui/betTabHelpers";
import { getMarketTypeName } from "@/utils/overtime/ui/markets";
import { getMarketOutcomeText } from "@/utils/overtime/ui/markets";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Drawer } from "vaul";
import BetInput from "./bet-input";
import { useState } from "react";
import { INITIAL_BET_AMOUNT } from "@/app/constants/Constants";
import BetHeader from "./bet-header";
import { useAccount, useBalance } from "wagmi";

interface BetTabProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BetTab({ isOpen, setIsOpen }: BetTabProps) {
  const { address } = useAccount();
  const [userBetsAtomData, setUserBetsAtom] = useAtom(userBetsAtom);
  const [betAmount, setBetAmount] = useState(INITIAL_BET_AMOUNT);
  const numberBets = userBetsAtomData.length;
  const tradeData = userBetsAtomData?.map((bet) => bet?.tradeData) || [];
  console.log(tradeData);

  const { data: ethBalance } = useBalance({
    address: address,
  });

  console.log("ethBalance", ethBalance);

  const numberBetAmount = betAmount
    ? parseFloat(betAmount.replace("$", ""))
    : 0;

  const {
    data: quoteObject,
    isLoading: quoteLoading,
    isError: isQuoteError,
  } = useQuery({
    queryKey: ["quote", betAmount, tradeData],
    queryFn: async () => {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyInAmount: numberBetAmount,
          tradeData: tradeData,
          collateral: "ETH",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      return response.json() as Promise<QuoteData>;
    },
    enabled: numberBetAmount > 0 && tradeData.length > 0,
  });

  if (quoteObject) {
    console.log("quoteObject", quoteObject);
  }

  // const onBetSuccess = () => {
  //     console.log("Bet placed successfully!");
  //     setUserBetsAtom([]);
  //     isKeyboardVisible.value = false;
  //     setIsKeyboardVisible(false);
  //     setBetAmount(INITIAL_BET_AMOUNT);
  //     queryClient.invalidateQueries({ queryKey: ["userHistory"] });
  //     queryClient.invalidateQueries({ queryKey: ["fungibles"] });
  //     router.push("/bets");
  //   };

  //   const { placeBet, writeContractsIsPending, writeContractsIsError } =
  //   usePlaceBet(onBetSuccess);

  const firstBet = userBetsAtomData[0];
  const isParlay = numberBets > 1;

  const betTypeName =
    tradeData.length > 0
      ? isParlay
        ? userBetsAtomData
            .map((bet) =>
              getMarketOutcomeText(
                bet.sportMarket,
                bet.tradeData.position,
                bet.tradeData.typeId,
                bet.tradeData.line
              )
            )
            .join(", ")
        : getMarketTypeName(firstBet.tradeData.typeId)
      : "";

  const marketOutcomeText =
    tradeData.length > 0
      ? isParlay
        ? `${numberBets} Game Parlay`
        : getMarketOutcomeText(
            firstBet.sportMarket,
            firstBet.tradeData.position,
            firstBet.tradeData.typeId,
            firstBet.tradeData.line
          )
      : "";

  //   const handlePlaceBet = () => {
  //     if (!quoteObject || isQuoteError) {
  //       Alert.alert("Error", "Quote data is not available");
  //       return;
  //     }

  //     placeBet(quoteObject, tradeData);
  //   };

  const americanOdds =
    quoteObject && isSuccessfulQuoteObject(quoteObject.quoteData)
      ? quoteObject.quoteData.totalQuote.american
      : extractAmericanOddsFromBets(userBetsAtomData);

  const formattedAmericanOdds = formatAmericanOdds(americanOdds);
  const tenDollarBetOutcome = calculateBetOutcome(americanOdds, 10);

  const getWinText = (quoteObject: QuoteData | undefined) => {
    if (quoteObject && isSuccessfulQuoteObject(quoteObject.quoteData)) {
      return `To Win: ${formatCurrency({
        amount: quoteObject.quoteData.potentialProfit.usd,
        omitDecimalsForWholeNumbers: true,
      })}`;
    }
    return "To Win";
  };

  const buttonLoadingText = getWinText(quoteObject);

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={false}
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none border-t border-gray-200">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            {/* <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-red-300 mb-8" /> */}
            <div className="flex flex-col max-w-md mx-auto gap-4">
              {/* Header */}
              <BetHeader
                numberBets={numberBets}
                tenDollarBetOutcome={tenDollarBetOutcome}
                onClearBetSlip={() => {
                  setUserBetsAtom([]);
                  setBetAmount(INITIAL_BET_AMOUNT);
                  setIsOpen(false);
                }}
              />

              {/* Bet Info */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>{marketOutcomeText}</span>
                  <span>{formattedAmericanOdds}</span>
                </div>
                <p className="text-base text-gray-800">{betTypeName}</p>
              </div>

              {/* Bet Input */}
              <BetInput
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                onInputPress={() => {}}
                onButtonPress={() => {}}
                isLoading={quoteLoading}
                isDisabled={!quoteObject || isQuoteError}
                buttonLabel="Place Bet"
                isLoadingText={buttonLoadingText}
              />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
