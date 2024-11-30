"use client";

import dynamic from "next/dynamic";
import AtomProvider from "~/components/providers/AtomProvider";

const WagmiProvider = dynamic(
  () => import("~/components/providers/WagmiProvider"),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <AtomProvider>{children}</AtomProvider>
    </WagmiProvider>
  );
}
