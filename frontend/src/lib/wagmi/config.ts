import { CONFIG } from "@/config/global-config";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [hardhat, sepolia],
  ssr: true,
  multiInjectedProviderDiscovery: false,
  connectors: [
    metaMask(),
    coinbaseWallet(),
    walletConnect({
      projectId: CONFIG.walletConnectId,
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
