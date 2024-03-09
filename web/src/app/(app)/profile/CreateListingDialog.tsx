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
import {PropsWithChildren, useState} from "react";
import {NftCard} from "../common/NftCard";
import {useCreateListing} from "@/hooks/useMarketplace";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

type Props = {
  nft: NFT
}

export const CreateListingDialog = ({ nft, children }: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false)
  const [price, setPrice] = useState(0)
  const {
    listing,
    createListing,
    isLoading,
    error
  } = useCreateListing(nft)
  const router = useRouter()

  const handleSubmit = async () => {
    const result = await createListing(price)
    console.log(result)
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <NftCard nft={nft}/>
          <div className="flex gap-1 items-center">
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              step="0.001"
              data-format="$1 ETH"
            />
            <span>ETH</span>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!!listing}
            loading={isLoading}
          >出品</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
