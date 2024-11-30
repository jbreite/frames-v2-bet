import { SportMarket, TradeData } from "~/utils/overtime/types/markets";
import { atom } from "jotai";

// Define the type for a single bet
export type UserBet = {
  tradeData: TradeData;
  sportMarket: SportMarket;
};

// Export the atom with the defined type
export const userBetsAtom = atom<UserBet[]>([]);
