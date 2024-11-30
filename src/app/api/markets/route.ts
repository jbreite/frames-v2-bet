import { NextRequest, NextResponse } from "next/server";
import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "~/app/constants/Constants";
import {
  SportMarket,
  SportMarketStatusEnum,
} from "~/utils/overtime/types/markets";
import { LeagueEnum, SportEnum } from "~/utils/overtime/enums/sport";
import { MarketTypeEnum } from "~/utils/overtime/enums/marketTypes";

//Check this
interface MarketResponse {
  [sport: string]: {
    [leagueId: string]: SportMarket[];
  };
}

interface MarketFilters {
  sport?: SportEnum;
  leagueId?: LeagueEnum;
  status?: SportMarketStatusEnum;
  type?: MarketTypeEnum;
  ungroup?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const network =
      searchParams.get("network") || CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM;

    // Build filters from query params
    const filters: MarketFilters = {};
    if (searchParams.has("sport"))
      filters.sport = searchParams.get("sport") as SportEnum;
    if (searchParams.has("leagueId"))
      filters.leagueId = Number(searchParams.get("leagueId")) as LeagueEnum;
    if (searchParams.has("status"))
      filters.status = Number(
        searchParams.get("status")
      ) as SportMarketStatusEnum;
    if (searchParams.has("type"))
      filters.type = Number(searchParams.get("type")) as MarketTypeEnum;
    if (searchParams.has("ungroup"))
      filters.ungroup = searchParams.get("ungroup") === "true";

    const markets = await getMarkets(Number(network), filters);

    return NextResponse.json(markets);
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch markets" },
      { status: 500 }
    );
  }
}

// // Fetch function
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
