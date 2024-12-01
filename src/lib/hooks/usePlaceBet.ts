// import sportsAMMV2Contract, {
//   DEFAULT_USDC_OPTIMISM,
//   REFERRAL_ADDRESS,
// } from "@/app/constants/overtimeContracts";
// import { encodeFunctionData, parseUnits } from "viem";
// import { getTradeData } from "@/utils/overtime/ui/helpers";
// import { QuoteData } from "@/app/api/quote/route";
// import { DEFAULT_SLIPPAGE } from "@/app/constants/overtimeContracts";
// import { TradeData } from "@/utils/overtime/types/markets";
// import { parseEther } from "viem";
// import { useWriteContract } from "wagmi";
// import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/app/constants/Constants";

// export const usePlaceBet = (onSuccess?: () => void) => {
//   const {
//     writeContracts,
//     data: writeContractsData,
//     isPending: writeContractsIsPending,
//     isError: writeContractsIsError,
//   } = useWriteContract({
//     mutation: {
//       onSuccess: () => {
//         console.log("Bet placed successfully!");
//         if (onSuccess) {
//           console.log("Calling provided onSuccess callback");
//           onSuccess();
//         }
//         // ... other logic here for success or error
//       },
//     },
//   });

//   const placeBet = async (quoteObject: QuoteData, tradeData: TradeData[]) => {
//     if ("error" in quoteObject.quoteData) {
//       throw new Error("Got an error quote Object");
//     }

//     console.log("tradeData", tradeData);

//     const parsedTotalQuote = parseEther(
//       quoteObject.quoteData.totalQuote.normalizedImplied.toString()
//     );
//     const parsedSlippage = DEFAULT_SLIPPAGE;
//     const preparedTradeData = getTradeData(tradeData);

//     const buyInAmount = parseUnits(
//       quoteObject.quoteData.buyInAmountInUsd.toString(),
//       6
//     );

//     const approvalAmount = buyInAmount;
//     //Just do actual amount since gets taken away anyway from contract

//     const betContractInput = {
//       abi: sportsAMMV2Contract.abi,
//       address: sportsAMMV2Contract.addresses[
//         CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
//       ] as `0x${string}`,
//       functionName: "trade",
//       args: [
//         preparedTradeData,
//         buyInAmount,
//         parsedTotalQuote,
//         parsedSlippage,
//         REFERRAL_ADDRESS,
//         DEFAULT_USDC_OPTIMISM,
//         false,
//       ],
//     };

//     const betCalldata = encodeFunctionData(betContractInput);
//     console.log("Bet call Data", betCalldata);

//     let contracts = [];
//     if (buyInAmount > allowance) {
//       console.log("hello");
//       contracts = [approvalContractInput, betContractInput];
//     } else {
//       contracts = [betContractInput];
//     }

//     writeContract({
//       contracts: contracts,
//     });
//   };

//   return {
//     placeBet,
//     writeContractsIsPending,
//     writeContractsIsError,
//   };
// };
