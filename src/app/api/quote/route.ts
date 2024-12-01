import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "@/app/constants/Constants";
import { TradeData } from "@/utils/overtime/types/markets";
import { NextResponse } from "next/server";

export interface SuccessfulQuoteData {
  totalQuote: {
    normalizedImplied: number;
    american: number;
  };
  buyInAmountInUsd: number;
  payout: {
    usd: number;
  };
  potentialProfit: {
    usd: number;
    percentage: number;
  };
}

// Define the structure for an error response
export interface ErrorQuoteData {
  error: string;
}

// Define the structure for liquidity data
interface LiquidityData {
  ticketLiquidityInUsd: number;
}

// Main QuoteData type using discriminated union
export type QuoteData = {
  quoteData: SuccessfulQuoteData | ErrorQuoteData;
  liquidityData: LiquidityData;
};

interface QuoteRequestBody {
  buyInAmount: number;
  tradeData: TradeData[];
  network?: CB_BET_SUPPORTED_NETWORK_IDS;
  collateral?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.buyInAmount || !body.tradeData) {
      return NextResponse.json(
        { error: "buyInAmount and tradeData are required" },
        { status: 400 }
      );
    }

    const {
      buyInAmount,
      tradeData,
      network = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM,
      collateral,
    } = body as QuoteRequestBody;

    const url = `${OVERTIME_API_BASE_URL}/networks/${network}/quote`;

    const requestBody: QuoteRequestBody = {
      buyInAmount,
      tradeData,
      ...(collateral && { collateral }),
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
