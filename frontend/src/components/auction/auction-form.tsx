"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { parseEther } from "viem";
import { Button, Field, Form } from "../ui";
import { useWriteContract } from "wagmi";
import {
  contractEngAuctionConfig,
  contractPrizeNFTConfig,
} from "@/lib/wagmi/contracts";
import { handleTransactionError, notify } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";

const AuctionSchema = zod.object({
  startPrice: zod
    .number({ coerce: true })
    .positive({ message: "Start price must be greater than 0" }),
  duration: zod
    .number({ coerce: true })
    .positive({ message: "Duration must be greater than 0" }),
});

type AuctionSchemaType = zod.infer<typeof AuctionSchema>;

const defaultValues: AuctionSchemaType = {
  startPrice: 0,
  duration: 0,
};

export function AuctionForm({
  tokenId,
  onSuccess,
  tokenURI,
}: {
  tokenId: bigint;
  onSuccess?: () => void;
  tokenURI: string;
}) {
  const methods = useForm<AuctionSchemaType>({
    resolver: zodResolver(AuctionSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const { writeContractAsync } = useWriteContract();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const duration = BigInt(data.duration * 24 * 60 * 60); // seconds
      const startPrice = parseEther(data.startPrice.toString());

      await writeContractAsync({
        ...contractPrizeNFTConfig,
        functionName: "setApprovalForAll",
        args: [contractEngAuctionConfig.address, true],
      });

      await writeContractAsync({
        ...contractEngAuctionConfig,
        functionName: "createAuction",
        args: [
          startPrice,
          duration,
          contractPrizeNFTConfig.address,
          tokenId,
          tokenURI,
        ],
      });

      onSuccess?.();

      notify("Transaction confirmed!", "success");

      await queryClient.invalidateQueries({ queryKey: ["auctions"] });
    } catch (err) {
      handleTransactionError(err);
    }
  });

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <div className="space-y-3">
        <Field.Text name="startPrice" label="Start price (ETH)" type="number" />
        <Field.Text
          name="duration"
          label="Duration (Days)"
          type="number"
          integerOnly
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full mt-7"
          size="small"
        >
          Create
        </Button>
      </div>
    </Form>
  );
}
