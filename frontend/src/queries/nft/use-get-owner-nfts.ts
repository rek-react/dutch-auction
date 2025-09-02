"use client";

import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { fetchOwnerNFTs } from "@/services";

export const useGetOwnerNFTs = () => {
  const { address } = useAccount();

  const { data: nftMetadataList = [], ...other } = useQuery({
    queryKey: ["ownerNFTs"],
    queryFn: () => fetchOwnerNFTs(address),
    enabled: !!address,
  });

  return { nftMetadataList, ...other };
};
