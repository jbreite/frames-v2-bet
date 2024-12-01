import { MarketFilters } from "@/app/api/markets/route";
import { MarketResponse } from "@/app/api/markets/route";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/app/constants/Constants";

import { OVERTIME_API_BASE_URL } from "@/app/constants/Constants";

export const getMarkets = async (
  network: number = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM,
  filters: MarketFilters = {}
): Promise<MarketResponse> => {
  const params = new URLSearchParams();
  const networkToString = network.toString();

  if (filters.sport) params.append("sport", filters.sport);
  if (filters.leagueId) params.append("leagueId", filters.leagueId.toString());
  if (filters.status) params.append("status", filters.status.toString());
  if (filters.type) params.append("type", filters.type.toString());
  if (filters.ungroup !== undefined)
    params.append("ungroup", filters.ungroup.toString());

  const url = `${OVERTIME_API_BASE_URL}/networks/${networkToString}/markets?${params.toString()}`;
  console.log(url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch markets: ${response.statusText}`);
  }

  return response.json();
};
