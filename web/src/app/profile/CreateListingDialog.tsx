'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {NFT} from "@thirdweb-dev/sdk";
import {PropsWithChildren} from "react";
import {NftCard} from "@/app/profile/NftCard";
import {useContract, useCreateDirectListing, useDirectListings} from "@thirdweb-dev/react";

type Props = {
  nft: NFT
}

export const CreateListingDialog = ({ nft, children }: PropsWithChildren<Props>) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
  const {
    data: listings,
    isLoading: listLoading,
    error: listError
  } = useDirectListings(contract, { tokenId: nft.metadata.id });
  const listing = listings?.[0];
  const {
    mutateAsync: createDirectListing,
    isLoading: createLoading,
    error: createError,
  } = useCreateDirectListing(contract);

  const isLoading = listLoading || createLoading;
  const error = listError || createError;

  const handleSubmit = async () => {
    const result = await createDirectListing({
      tokenId: nft.metadata!.id,
      pricePerToken: "0.01",
      assetContractAddress: process.env.NEXT_PUBLIC_SUPERPOWER_ADDRESS,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Listing</DialogTitle>
          <DialogDescription>
            このNFTを出品しますか
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NftCard nft={nft}/>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!!listing}
          >出品</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

