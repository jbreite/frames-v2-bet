import { cn } from "@/lib/utils";
import LoadingSpinner from "../loading-spinner";

interface BetInputProps {
  betAmount: string;
  setBetAmount: (betAmount: string) => void;
  onButtonPress: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  buttonLabel: string;
  isLoadingText: string;
}

export default function BetInput({
  betAmount,
  setBetAmount,
  onButtonPress,
  isLoading,
  isDisabled,
  buttonLabel,
  isLoadingText,
}: BetInputProps) {
  return (
    <div className="flex flex-row gap-6 py-1 pr-1 pl-4 rounded-full border border-gray-200">
      <input
        type="number"
        inputMode="decimal"
        pattern="[0-9]*"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        className="flex w-3/5 font-bold focus:outline-none bg-transparent"
        placeholder="ETH amount"
      />

      <button
        onClick={onButtonPress}
        disabled={isDisabled}
        className={cn(
          "flex w-full p-4 rounded-full justify-center font-semibold",
          isDisabled
            ? "bg-gray-200 text-gray-400"
            : "bg-blue-500 text-white hover:bg-blue-600"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            {isLoadingText}
          </div>
        ) : (
          buttonLabel
        )}
      </button>
    </div>
  );
}
