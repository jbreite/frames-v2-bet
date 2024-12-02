import { cn } from "@/lib/utils";

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
        className="flex w-full font-bold focus:outline-none"
        placeholder="Enter ETH amount"
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

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
