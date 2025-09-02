"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAuctions } from "@/services";

export const useGetAuctions = () => {
  const { data: auctions = [], ...other } = useQuery({
    queryKey: ["auctions"],
    queryFn: fetchAuctions,
  });

  return { auctions, ...other };
};
