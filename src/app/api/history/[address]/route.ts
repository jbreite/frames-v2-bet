import { NextResponse } from "next/server";
import {
  CB_BET_SUPPORTED_NETWORK_IDS,
  OVERTIME_API_BASE_URL,
} from "@/app/constants/Constants";

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const networkToString = CB_BET_SUPPORTED_NETWORK_IDS.OPTIMISM.toString();
    const url = `${OVERTIME_API_BASE_URL}/networks/${networkToString}/users/${params.address}/history`;
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch history: ${response.statusText}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
