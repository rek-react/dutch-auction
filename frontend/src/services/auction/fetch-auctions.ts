import { readContract } from "@wagmi/core";
import { Auction } from "@/types";
import { contractEngAuctionConfig } from "@/lib/wagmi/contracts";
import { config } from "@/lib/wagmi/config";
import { fetchNFTMetadata } from "../nft/fetch-nft-metadata";

export const fetchAuctions = async (): Promise<Auction[]> => {
  const auctions = (await readContract(config, {
    ...contractEngAuctionConfig,
    functionName: "getAuctions",
    args: [],
  })) as Auction[];

  if (!auctions?.length) return [];

  const withMetadata = await Promise.all(
    auctions.map(async (auction, i): Promise<Auction> => {
      const nftMetadata = await fetchNFTMetadata(auction.prize.tokenURI);
      return {
        ...auction,
        id: i,
        prize: { ...auction.prize, nftMetadata: nftMetadata },
      };
    })
  );

  return withMetadata;
};
