import { Button } from "~/components/ui/Button";

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
    <Button
      onClick={handlePress}
      disabled={zeroLine}
      className={`
        flex-1 py-2 px-4
        flex items-center justify-center
        rounded-xl border-2 border-gray-200
        min-h-[54px]
        ${selected ? "bg-gray-200" : "bg-transparent"}
      `}
    >
      {zeroLine ? (
        <LockIcon className="h-[18px] w-[18px]" />
      ) : (
        <div className="flex flex-col items-center justify-center">
          {label && <span className="font-semibold">{label}</span>}
          <span className="font-semibold">{line}</span>
        </div>
      )}
    </Button>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
