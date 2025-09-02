"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { UserRejectedRequestError, BaseError } from "viem";
import { Button, Field, Form, schemaHelper } from "../ui";

import { useAccount, useWriteContract } from "wagmi";
import { contractPrizeNFTConfig } from "@/lib/wagmi/contracts";

import { fetcher } from "@/lib/axios";
import { CidResult } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { handleTransactionError, notify } from "@/utils";

const NFTSchema = zod.object({
  name: zod.string().min(1, { message: "Required" }),
  description: zod.string().nullable(),
  image: schemaHelper.file({
    message: "Required",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg"],
  }),
});

type NFTSchemaType = zod.infer<typeof NFTSchema>;

const defaultValues: NFTSchemaType = {
  name: "",
  description: "",
  image: null,
};

export function NFTForm({ onSuccess }: { onSuccess?: () => void }) {
  const methods = useForm<NFTSchemaType>({
    resolver: zodResolver(NFTSchema),
    defaultValues,
  });

  const { address } = useAccount();
  const queryClient = useQueryClient();

  const { writeContractAsync } = useWriteContract();

  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);

      if (data.description) formData.append("description", data.description);
      if (data.image) formData.append("file", data.image);

      const { cid }: CidResult = await fetcher({
        url: "/ipfs/upload",
        method: "POST",
        data: formData,
      });

      await writeContractAsync({
        ...contractPrizeNFTConfig,
        functionName: "mint",
        args: [address, cid],
      });

      onSuccess?.();

      notify("Transaction confirmed!", "success");

      await queryClient.invalidateQueries({
        queryKey: ["ownerNFTs"],
      });
    } catch (err) {
      handleTransactionError(err);
    }
  });

  const handleDeleteImage = () => {
    setValue("image", null);
  };

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <div className="space-y-3">
        <Field.Text name="name" label="NFT name" />
        <Field.Text
          name="description"
          label="NFT description (optional)"
          multiline
          rows={2}
        />

        <Field.Upload name="image" onDelete={handleDeleteImage} />
      </div>
      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full mt-7"
        size="small"
      >
        Create
      </Button>
    </Form>
  );
}
