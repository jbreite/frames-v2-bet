import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/app/constants/Constants";
import { OVERTIME_API_BASE_URL } from "@/app/constants/Constants";
import { Ticket } from "../types/markets";

export type HistoryRepsone = {
  open: Ticket[];
  claimable: Ticket[];
  closed: Ticket[];
};

export const getHistory = async (
  address: string,
  network: number = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM
): Promise<HistoryRepsone> => {
  const networkToString = network.toString();
  const url = `${OVERTIME_API_BASE_URL}/networks/${networkToString}/users/${address}/history`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch history: ${response.statusText}`);
  }

  return response.json();
};
