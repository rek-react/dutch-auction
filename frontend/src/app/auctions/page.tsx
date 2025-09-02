"use client";

import {
  HeadCell,
  Table,
  TableBody,
  TableHead,
  TableNoData,
  TableSkeleton,
  Typography,
} from "@/components";
import { AuctionRow } from "@/components/auction";
import { useGetAuctions } from "@/queries/auction/use-get-auctions";

const TABLE_HEAD: HeadCell[] = [
  { name: "NFT", align: "center", width: 200 },
  { name: "Seller", align: "center" },
  { name: "Start price", align: "center" },
  { name: "Current price", align: "center" },
  { name: "Action", align: "center", width: 120 },
];

export default function Page() {
  const { auctions, isFetching } = useGetAuctions();

  return (
    <div className="container">
      <Typography variant="h2" className="mb-8">
        Auctions
      </Typography>
      <Table className="min-w-3xl">
        <TableHead headCells={TABLE_HEAD} />
        <TableBody>
          {isFetching ? (
            <TableSkeleton
              cellCount={TABLE_HEAD.length}
              rowCount={5}
              className="h-10"
            />
          ) : auctions.length ? (
            auctions.map((auction) => (
              <AuctionRow auction={auction} key={auction.id} />
            ))
          ) : (
            <TableNoData />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
