import { DEFAULT_NFT_METADATA } from "@/constants";
import { NFTMetadata } from "@/types";
import { ipfsToHttp } from "@/utils";
import axios from "axios";

export const fetchNFTMetadata = async (
  tokenURI: string
): Promise<NFTMetadata> => {
  try {
    const res = await axios.get<NFTMetadata>(ipfsToHttp(tokenURI));

    return res.data;
  } catch (err) {
    console.error("Failed to fetch NFT metadata for", tokenURI, err);
    return DEFAULT_NFT_METADATA;
  }
};
