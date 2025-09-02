import { Address } from "viem";
import { NFTMetadata } from "./nft";

export type Prize = {
  nftAddress: Address;
  tokenId: bigint;
  tokenURI: string;

  nftMetadata: NFTMetadata;
};

export type Auction = {
  id: number;
  seller: Address;
  startPrice: bigint;
  finalPrice: bigint;
  startAt: bigint;
  endAt: bigint;
  discountRate: bigint;
  duration: bigint;
  prize: Prize;
  stopped: boolean;
};
