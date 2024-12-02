import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAccount, useWriteContract } from "wagmi";
import { useAtom } from "jotai";
import { userBetsAtom } from "@/lib/atom/atoms";
import { getHistory } from "@/utils/overtime/queries/get-history";
import { CB_BET_SUPPORTED_NETWORK_IDS } from "@/app/constants/Constants";
import TicketView from "./ticket";
// import sportsAMMV2Contract from "@/constants/overtimeContracts";

export default function History({
  address,
}: {
  address: `0x${string}` | undefined;
}) {
  const {
    data: userHistoryData,
    isLoading: userHistoryIsLoading,
    isError: userHistoryIsError,
    refetch,
  } = useQuery({
    queryKey: ["userHistory", address?.toString()],
    queryFn: () => getHistory(address as `0x${string}`),
    enabled: !!address,
  });

  const handleClaim = (ticketId: string) => {
    if (!address) {
      console.error("No wallet address found");
      return;
    }

    // TODO: Implement claim functionality
  };

  if (userHistoryIsLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (userHistoryIsError) {
    return <div className="text-red-500">Error loading history</div>;
  }

  if (!address) {
    return (
      <div className="text-center py-4">
        Connect your wallet to view your history
      </div>
    );
  }

  const noUserHistory =
    !userHistoryData ||
    (userHistoryData.claimable.length === 0 &&
      userHistoryData.open.length === 0 &&
      userHistoryData.closed.length === 0);

  if (noUserHistory) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <span className="text-2xl mb-2">🎟️</span>
        <span className="text-2xl font-bold text-center">
          Place bets to populate your history!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 ">
      {userHistoryData.claimable.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Claimable</h2>
          {userHistoryData.claimable.map((ticket: any) => (
            <TicketView
              key={ticket.id}
              ticket={ticket}
              onPress={() => handleClaim(ticket.id)}
            />
          ))}
        </div>
      )}

      {userHistoryData.open.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Open</h2>
          {userHistoryData.open.map((ticket: any) => (
            <TicketView key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}

      {userHistoryData.closed.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Closed</h2>
          {userHistoryData.closed.map((ticket: any) => (
            <TicketView key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
