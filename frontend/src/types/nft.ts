export type Nft = {
  tokenId: bigint;
  tokenURI: string;
};

export type NFTMetadata = {
  name: string;
  description?: string;
  image: string;
};

export type NftWithMetadata = Nft & {
  metadata: NFTMetadata;
};
