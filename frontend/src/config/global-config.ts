const isDev = process.env.NODE_ENV === "development";

export const CONFIG = {
  isDev,
  walletConnectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
  serverUrl: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
  ipfsGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY || "",
};
