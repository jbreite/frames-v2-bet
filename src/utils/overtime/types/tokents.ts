export type Coins = "USDC" | "WETH";

export type Token = {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  chainId: number;
  logoURI: string;
};
