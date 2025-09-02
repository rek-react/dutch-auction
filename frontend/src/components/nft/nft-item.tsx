"use client";

import { NftWithMetadata } from "@/types";
import { Button, Image, Modal, Typography } from "../ui";
import { handleTransactionError, ipfsToHttp, notify } from "@/utils";
import { AuctionForm } from "../auction";
import { useBoolean } from "minimal-shared";
import { useRouter } from "next/navigation";
import { PATHS } from "@/config/paths";
import { ConfirmModal } from "../confirm-modal";
import { useWriteContract } from "wagmi";
import { contractPrizeNFTConfig } from "@/lib/wagmi/contracts";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function NFTItem({ metadata, tokenId, tokenURI }: NftWithMetadata) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: isAuctionModal,
    onFalse: onCloseAuctionModal,
    onTrue: onOpenAuctionModal,
  } = useBoolean(false);

  const {
    value: isConfirmModal,
    onFalse: onCloseConfirmModal,
    onTrue: onOpenConfirmModal,
  } = useBoolean(false);

  const { writeContractAsync } = useWriteContract();
  const queryClient = useQueryClient();

  const router = useRouter();

  const deleteNft = async () => {
    try {
      setIsLoading(true);
      await writeContractAsync({
        ...contractPrizeNFTConfig,
        functionName: "burn",
        args: [tokenId],
      });

      notify("Transaction confirmed!", "success");
      onCloseConfirmModal();

      await queryClient.invalidateQueries({
        queryKey: ["ownerNFTs"],
      });
    } catch (err) {
      handleTransactionError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 bg-background-secondary rounded-2xl flex flex-col relative">
        <Image
          src={ipfsToHttp(metadata.image)}
          className="rounded-2xl"
          ratio="16/9"
          alt="nft"
        />
        <Typography variant="h4" className="mt-2 sm:mt-3 flex-1">
          {metadata.name}
        </Typography>

        {metadata.description && (
          <Typography className="mt-1">{metadata.description}</Typography>
        )}
        <div className="flex flex-col gap-2 mt-3 sm:mt-4">
          <Button onClick={onOpenAuctionModal}>Put up for auction</Button>
          <Button className="!bg-red-accent" onClick={onOpenConfirmModal}>
            Burn
          </Button>
        </div>
      </div>
      <Modal
        open={isAuctionModal}
        onClose={onCloseAuctionModal}
        label="Create auction"
      >
        <AuctionForm
          tokenId={tokenId}
          tokenURI={tokenURI}
          onSuccess={() => {
            onCloseAuctionModal();
            router.push(PATHS.auctions);
          }}
        />
      </Modal>
      <ConfirmModal
        onClose={onCloseConfirmModal}
        open={isConfirmModal}
        content="Are you sure you want to burn this nft?"
        action={
          <Button
            onClick={deleteNft}
            isLoading={isLoading}
            className="!bg-green-accent"
            size="small"
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
