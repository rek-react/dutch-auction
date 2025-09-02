import { readContract } from "@wagmi/core";
import { Address } from "viem";
import { Nft, NftWithMetadata } from "@/types";
import { contractPrizeNFTConfig } from "@/lib/wagmi/contracts";
import { config } from "@/lib/wagmi/config";
import { fetchNFTMetadata } from "./fetch-nft-metadata";

export const fetchOwnerNFTs = async (
  address: Address | undefined
): Promise<NftWithMetadata[]> => {
  if (!address) return [];

  const nfts = (await readContract(config, {
    ...contractPrizeNFTConfig,
    functionName: "getOwnerTokens",
    args: [address],
  })) as Nft[];

  if (!nfts?.length) return [];

  const nftMetadataList = (await Promise.all(
    nfts.map(async ({ tokenId, tokenURI }): Promise<NftWithMetadata> => {
      const nftMetadata = await fetchNFTMetadata(tokenURI);

      return { tokenId, metadata: nftMetadata, tokenURI };
    })
  )) as NftWithMetadata[];

  return nftMetadataList;
};
