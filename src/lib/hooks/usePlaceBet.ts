import sportsAMMV2Contract, {
  ETH_OPTIMISM,
  REFERRAL_ADDRESS,
} from "@/app/constants/overtimeContracts";
import { encodeFunctionData, parseUnits } from "viem";
import { getTradeData } from "@/utils/overtime/ui/helpers";
import { QuoteData } from "@/app/api/quote/route";
import { DEFAULT_SLIPPAGE } from "@/app/constants/overtimeContracts";
import { TradeData } from "@/utils/overtime/types/markets";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/app/constants/Constants";

export const usePlaceBet = (onSuccess?: () => void) => {
  const {
    writeContract,
    isPending: writeContractsIsPending,
    isError: writeContractsIsError,
  } = useWriteContract({
    mutation: {
      onSuccess: () => {
        console.log("Bet placed successfully!");
        if (onSuccess) {
          console.log("Calling provided onSuccess callback");
          onSuccess();
        }
        // ... other logic here for success or error
      },
    },
  });

  const placeBet = async (
    quoteObject: QuoteData,
    tradeData: TradeData[],
    ethAmount: number
  ) => {
    if ("error" in quoteObject.quoteData) {
      throw new Error("Got an error quote Object");
    }

    const parsedTotalQuote = parseEther(
      quoteObject.quoteData.totalQuote.normalizedImplied.toString()
    );
    const parsedSlippage = DEFAULT_SLIPPAGE;
    const preparedTradeData = getTradeData(tradeData);

    const buyInAmount = parseUnits(ethAmount.toString(), 18);

    const betContractInput = {
      abi: sportsAMMV2Contract.abi,
      address: sportsAMMV2Contract.addresses[
        CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
      ] as `0x${string}`,
      functionName: "trade",
      args: [
        preparedTradeData,
        buyInAmount,
        parsedTotalQuote,
        parsedSlippage,
        REFERRAL_ADDRESS,
        ETH_OPTIMISM,
        true,
      ],
      value: buyInAmount,
    };

    const betCalldata = encodeFunctionData(betContractInput);
    console.log("Bet call Data", betCalldata);

    writeContract({
      ...betContractInput,
    });
  };

  return {
    placeBet,
    writeContractsIsPending,
    writeContractsIsError,
  };
};
