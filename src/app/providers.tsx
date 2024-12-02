"use client";

import dynamic from "next/dynamic";
import AtomProvider from "@/components/providers/AtomProvider";
import { CSPostHogProvider } from "@/components/providers/PosthogProvider";

const WagmiProvider = dynamic(
  () => import("@/components/providers/WagmiProvider"),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CSPostHogProvider>
      <WagmiProvider>
        <AtomProvider>{children}</AtomProvider>
      </WagmiProvider>
    </CSPostHogProvider>
  );
}
