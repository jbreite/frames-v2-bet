interface ToggleBarProps {
  activeTab: "bets" | "history";
  setActiveTab: (tab: "bets" | "history") => void;
}

export default function ToggleBar({ activeTab, setActiveTab }: ToggleBarProps) {
  return (
    <div className="flex bg-gray-100 p-1 rounded-lg">
      <button
        onClick={() => setActiveTab("bets")}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
          activeTab === "bets"
            ? "bg-white shadow text-black"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Bets
      </button>
      <button
        onClick={() => setActiveTab("history")}
        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
          activeTab === "history"
            ? "bg-white shadow text-black"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        History
      </button>
    </div>
  );
}
