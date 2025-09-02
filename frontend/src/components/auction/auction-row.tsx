"use client";

import { useEffect, useState } from "react";
import { Button, Image, TableCell, TableRow, Typography } from "../ui";
import { Auction } from "@/types";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import {
  copyToClipboard,
  formatEth,
  handleTransactionError,
  ipfsToHttp,
  notify,
} from "@/utils";
import { contractEngAuctionConfig } from "@/lib/wagmi/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { FiCopy } from "react-icons/fi";
import { useBoolean } from "minimal-shared";
import { ConfirmModal } from "../confirm-modal";
import { ImageModal } from "../image-modal";
import { useRouter } from "next/navigation";
import { PATHS } from "@/config/paths";

interface AuctionRowProps {
  auction: Auction;
}

export const AuctionRow = ({ auction }: AuctionRowProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
  const [currentPrice, setCurrentPrice] = useState(auction.startPrice);
  const {
    value: isConfirmModal,
    onFalse: onCloseConfirmModal,
    onTrue: onOpenConfirmModal,
  } = useBoolean(false);

  const {
    value: isImageModal,
    onFalse: onCloseImageModal,
    onTrue: onOpenImageModal,
  } = useBoolean(false);

  const { writeContractAsync } = useWriteContract();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (auction.stopped) return;

    const updatePrice = () => {
      const datePassed =
        BigInt(Math.floor(Date.now() / 1000)) - auction.startAt;
      const discountPassed = datePassed * auction.discountRate;
      const newPrice = auction.startPrice - discountPassed;
      setCurrentPrice(newPrice > BigInt(0) ? newPrice : BigInt(0));
    };

    updatePrice();
    const interval = setInterval(updatePrice, 1000);
    return () => clearInterval(interval);
  }, [auction]);

  const buy = async () => {
    try {
      setIsLoading(true);
      await writeContractAsync({
        ...contractEngAuctionConfig,
        functionName: "buy",
        args: [auction.id],
        value: currentPrice,
      });

      notify("Transaction confirmed!", "success");
      onCloseConfirmModal();

      await queryClient.invalidateQueries({ queryKey: ["auctions"] });
    } catch (err) {
      handleTransactionError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyClick = () => {
    if (!address) {
      router.push(PATHS.connectWallet);
      return;
    }

    if (address === auction.seller) {
      notify("You can't buy back because you are a seller", "error");
      return;
    }

    onOpenConfirmModal();
  };

  return (
    <>
      <TableRow className="text-center">
        <TableCell className="flex items-center gap-2 whitespace-nowrap">
          <Image
            src={ipfsToHttp(auction.prize.nftMetadata.image)}
            alt={auction.prize.nftMetadata.name}
            className="size-12 rounded cursor-pointer"
            onClick={onOpenImageModal}
          />

          {auction.prize.nftMetadata.name}
        </TableCell>
        <TableCell>
          <button
            className="flex justify-center items-center gap-2 mx-auto cursor-pointer select-none group"
            onClick={() => copyToClipboard(auction.seller)}
            title="Copy address"
          >
            <span>
              {auction.seller.slice(0, 6)}...{auction.seller.slice(-4)}
            </span>
            <FiCopy className=" text-gray-500 group-hover:text-gray-200 transition-colors" />
          </button>
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {formatEth(auction.startPrice)} ETH
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {formatEth(auction.stopped ? auction.finalPrice : currentPrice)} ETH
        </TableCell>
        <TableCell>
          {auction.stopped ? (
            <Typography
              variant="span"
              className="bg-red-accent py-2 px-5 rounded-2xl uppercase font-semibold"
            >
              Closed
            </Typography>
          ) : (
            <Button size="small" className="uppercase" onClick={handleBuyClick}>
              Buy
            </Button>
          )}
        </TableCell>
      </TableRow>
      <ConfirmModal
        onClose={onCloseConfirmModal}
        open={isConfirmModal}
        content="Are you sure you want to redeem this prize?"
        action={
          <Button
            onClick={buy}
            isLoading={isLoading}
            className="!bg-green-accent"
            size="small"
          >
            Confirm
          </Button>
        }
      />
      <ImageModal
        open={isImageModal}
        onClose={onCloseImageModal}
        src={ipfsToHttp(auction.prize.nftMetadata.image)}
        alt={auction.prize.nftMetadata.name}
      />
    </>
  );
};
