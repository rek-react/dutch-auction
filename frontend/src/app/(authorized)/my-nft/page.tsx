"use client";

import {
  Button,
  EmptyState,
  Image,
  Modal,
  NFTForm,
  NFTItem,
  Skeleton,
  Typography,
} from "@/components";
import { useGetOwnerNFTs } from "@/queries";
import { useBoolean } from "minimal-shared";

export default function Page() {
  const {
    value: isModal,
    onFalse: onCloseModal,
    onTrue: onOpenModal,
  } = useBoolean(false);

  const { nftMetadataList, isFetching } = useGetOwnerNFTs();

  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center gap-x-5 mb-8">
          <Typography variant="h2">My NFT</Typography>
          <Button variant="outlined" onClick={onOpenModal}>
            Create NFT
          </Button>
        </div>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetching
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} height={320} width="100%" />
              ))
            : nftMetadataList.map((nft) => (
                <NFTItem key={String(nft.tokenId)} {...nft} />
              ))}
        </div>

        {nftMetadataList.length === 0 && !isFetching && (
          <EmptyState
            title="No items found"
            description="Create new NFTs for yourself"
            buttonText="Create NFT"
            onButtonClick={onOpenModal}
          />
        )}
      </div>
      <Modal open={isModal} onClose={onCloseModal} label="Create NFT">
        <NFTForm onSuccess={onCloseModal} />
      </Modal>
    </>
  );
}
