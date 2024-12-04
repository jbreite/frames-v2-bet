import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface OddsButtonProps {
  line: string;
  onPress: () => void;
  label?: string;
  selected?: boolean;
}

export default function OddsButton({
  line,
  onPress,
  label,
  selected = false,
}: OddsButtonProps) {
  const numberLine = parseFloat(line);
  const zeroLine = numberLine === 0;

  const handlePress = () => {
    onPress();
  };

  return (
    <button
      onClick={handlePress}
      disabled={zeroLine}
      className={cn(
        "py-2 px-4 flex items-center justify-center w-full rounded-xl border-2 border-gray-200 min-h-[54px]",
        selected ? "bg-gray-200 dark:text-black" : "bg-transparent"
      )}
    >
      {zeroLine ? (
        <Lock className="h-[18px] w-[18px]" />
      ) : (
        <div className="flex flex-col  items-center justify-center">
          {label && (
            <span className="font-semibold text-sm w-full leading-tight">
              {label}
            </span>
          )}
          <span className="font-semibold text-sm w-full leading-tight">
            {line}
          </span>
        </div>
      )}
    </button>
  );
}
