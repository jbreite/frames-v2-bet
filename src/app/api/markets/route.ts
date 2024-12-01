import { NextRequest, NextResponse } from "next/server";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/app/constants/Constants";
import {
  SportMarket,
  SportMarketStatusEnum,
} from "@/utils/overtime/types/markets";
import { LeagueEnum, SportEnum } from "@/utils/overtime/enums/sport";
import { MarketTypeEnum } from "@/utils/overtime/enums/marketTypes";
import { getMarkets } from "@/utils/overtime/queries/get-markets";

//Check this
export interface MarketResponse {
  [sport: string]: {
    [leagueId: string]: SportMarket[];
  };
}

export interface MarketFilters {
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
