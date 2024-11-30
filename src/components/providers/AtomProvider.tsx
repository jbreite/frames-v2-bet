import { Provider } from "jotai";
import { defaultStore } from "~/lib/atom/store";

interface AtomProviderProps {
  children: React.ReactNode;
}

export default function AtomProvider({ children }: AtomProviderProps) {
  return <Provider store={defaultStore}>{children}</Provider>;
}
