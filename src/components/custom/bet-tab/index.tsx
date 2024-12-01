import { Drawer } from "vaul";

interface BetTabProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BetTab({ isOpen, setIsOpen }: BetTabProps) {
  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none border-t border-gray-200">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">
              <h1>Bet Tab</h1>
              <h1>Bet Tab</h1>
              <h1>Bet Tab</h1>
              <h1>Bet Tab</h1>
              <h1>Bet Tab</h1>
              <h1>Bet Tab</h1>
              <h1>Bet Tab</h1>
              {/* Your bet content here */}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
