import { formatCurrency } from "@/utils/overtime/ui/betTabHelpers";
import { CircleX } from "lucide-react";

export default function BetHeader({
  numberBets,
  tenDollarBetOutcome,
  onClearBetSlip,
}: {
  numberBets: number;
  tenDollarBetOutcome: { totalReturn: number; profit: number };
  onClearBetSlip: () => void;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <p className="font-semibold h-6 text-center aspect-square rounded-full bg-blue-500 text-white">
          {numberBets}
        </p>
        <p>Bet Slip</p>
      </div>
      <div className="flex items-center gap-2">
        <p>
          $10 to win{" "}
          {formatCurrency({
            amount: tenDollarBetOutcome.profit,
            omitDecimalsForWholeNumbers: true,
          })}
        </p>
        <button onClick={onClearBetSlip}>
          <CircleX className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
