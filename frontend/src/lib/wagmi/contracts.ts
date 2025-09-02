import { Abi, Address } from "viem";
import engAuction from "@/contracts/EngAuction.json";
import prizeNFT from "@/contracts/PrizeNFT.json";
import { CONFIG } from "@/config/global-config";
import { hardhat, sepolia } from "wagmi/chains";

const chainId = CONFIG.isDev ? hardhat.id : sepolia.id;

export const contractEngAuctionConfig = {
  address: engAuction.address as Address,
  abi: engAuction.abi as Abi,
  chainId,
} as const;

export const contractPrizeNFTConfig = {
  address: prizeNFT.address as Address,
  abi: prizeNFT.abi as Abi,
  chainId,
} as const;
