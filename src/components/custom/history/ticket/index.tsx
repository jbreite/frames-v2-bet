import { Ticket } from "@/utils/overtime/types/markets";
import { negativePlusHelper } from "@/utils/overtime/ui/helpers";
import { getMarketOutcomeText } from "@/utils/overtime/ui/markets";
import TeamMatchup from "./team-matchup";
import { convertNormalizedImpliedToAmerican } from "@/utils/overtime/ui/betTabHelpers";
import { formatCurrency } from "@/utils/overtime/ui/betTabHelpers";
import { getTeamImageSource } from "@/utils/overtime/ui/images";
import { Skeleton } from "@/components/ui/Skeleton";

// const OPTIMISTIC_ETHERERSCAN_BASE_URL =
//   "https://optimistic.etherscan.io/address/";

export default function TicketView({
  ticket,
  onPress,
}: {
  ticket: Ticket;
  onPress?: (ticketId: string) => void;
}) {
  const numberOfMarkets = ticket.numOfMarkets;
  const formattedBuyInAmount =
    ticket.collateral === "USDC"
      ? formatCurrency({ amount: ticket.buyInAmount })
      : `${ticket.buyInAmount.toFixed(6)}`;

  const formattedPayout =
    ticket.collateral === "USDC"
      ? formatCurrency({ amount: ticket.payout })
      : `${ticket.payout.toFixed(6)} WETH`;

  //   const ticketLink = `${OPTIMISTIC_ETHERERSCAN_BASE_URL}${ticket.id}`;
  const americanOdds = negativePlusHelper(
    convertNormalizedImpliedToAmerican(ticket.totalQuote)
  );

  const ticketName =
    numberOfMarkets > 1 ? `${numberOfMarkets}-Leg Parlay` : "Single Bet";

  const ticketGameStatuses = ticket.sportMarkets.reduce(
    (acc, market) => {
      if (market.isResolved) {
        acc[market.isWinning ? "Won" : "Lost"]++;
      } else {
        acc["Open"]++;
      }
      return acc;
    },
    { Won: 0, Lost: 0, Open: 0 }
  );

  const ticketStatusSummary = Object.entries(ticketGameStatuses)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => `${count} ${status}`)
    .join(", ");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold truncate">{ticketName}</span>
          <span className="text-base text-gray-500">{ticketStatusSummary}</span>
        </div>

        <div className="flex flex-col gap-1 items-end">
          <span className="text-lg font-medium text-right">
            {formattedBuyInAmount} To win {formattedPayout}
          </span>
          <span className="text-base text-gray-500 text-right">
            {americanOdds}
          </span>
        </div>
      </div>

      <div className="border-2 border-gray-200 rounded-2xl p-4 flex flex-col gap-4">
        {ticket.sportMarkets.map((market, index) => {
          const marketOdds = negativePlusHelper(
            convertNormalizedImpliedToAmerican(market.odd.normalizedImplied)
          );
          const marketOutcomeText = getMarketOutcomeText(
            market,
            market.position,
            market.typeId,
            market.line
          );
          //   const marketDate = convertUnixToFormattedDate(market.maturity);

          return (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-base font-semibold">
                  {marketOutcomeText}
                </span>
                <span className="text-base font-semibold">{marketOdds}</span>
              </div>
              <div className="flex items-center gap-1">
                <TeamMatchup
                  teamName={market.homeTeam}
                  teamImage={getTeamImageSource(
                    market.homeTeam,
                    market.leagueId
                  )}
                />
                <span className="font-semibold text-base">-</span>
                <TeamMatchup
                  teamName={market.awayTeam}
                  teamImage={getTeamImageSource(
                    market.awayTeam,
                    market.leagueId
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      {onPress && (
        <button
          onClick={() => onPress(ticket.id)}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium"
        >
          Claim {formattedPayout}
        </button>
      )}
    </div>
  );
}

export function TicketLoader() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className=" h-6 w-32" />
        <Skeleton className="w-full min-h-40" />
      </div>
    </div>
  );
}
