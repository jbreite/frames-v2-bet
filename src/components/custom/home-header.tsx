/* eslint-disable @next/next/no-img-element */
import { truncateAddress } from "@/lib/truncateAddress";
import { CircleXIcon } from "lucide-react";
import { Drawer } from "vaul";
import { useConnect } from "wagmi";
import { useDisconnect } from "wagmi";
import { config } from "@/components/providers/WagmiProvider";

export default function HomeHeader({
  isConnected,
  pfpUrl,
  username,
  address,
  setIsWalletOpen,
}: {
  isConnected: boolean;
  pfpUrl: string | undefined;
  username: string;
  address: `0x${string}`;
  setIsWalletOpen: (open: boolean) => void;
}) {
  const truncatedAddress = truncateAddress(address as `0x${string}`);
  const { connect } = useConnect();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        {pfpUrl && (
          <img src={pfpUrl} alt="Profile" className="w-10 h-10 rounded-full" />
        )}
        <p className=" font-semibold">{username}</p>
      </div>

      <button
        onClick={() =>
          isConnected
            ? setIsWalletOpen(true)
            : connect({ connector: config.connectors[0] })
        }
        className="font-semibold bg-gray-200 px-4 py-2 rounded-md "
      >
        {isConnected ? `${truncatedAddress}` : "Connect"}
      </button>
    </div>
  );
}

export function WalletControls({
  isOpen,
  setIsOpen,
  pfpUrl,
  address,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  pfpUrl: string | undefined;
  address: `0x${string}`;
}) {
  const { disconnect } = useDisconnect();

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none border-t border-gray-200">
          <div className="p-4 bg-white rounded-t-[10px] flex flex-col gap-4 items-center justify-between">
            <button onClick={() => setIsOpen(false)}>
              <CircleXIcon className="w-6 h-6 absolute right-4 top-4" />
            </button>
            {pfpUrl && (
              <img
                src={pfpUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            )}
            <p className="font-semibold text-lg">{truncateAddress(address)}</p>
            <div className="flex items-center gap-2">
              <WalletButton
                onClick={() => {
                  disconnect();
                  setIsOpen(false);
                }}
              >
                Disconnect
              </WalletButton>
              <WalletButton
                onClick={() => navigator.clipboard.writeText(address)}
              >
                Copy Address
              </WalletButton>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function WalletButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <button onClick={onClick}>{children}</button>;
}
