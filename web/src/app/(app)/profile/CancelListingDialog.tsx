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
import {DirectListingV3, NFT} from "@thirdweb-dev/sdk";
import {PropsWithChildren, useState} from "react";
import {NftCard} from "../common/NftCard";
import {useCancelListing, useCreateListing} from "@/hooks/useMarketplace";
import {Input} from "@/components/ui/input";
import {ListingCard} from "@/app/(app)/common/ListingCard";
import {useRouter} from "next/navigation";

type Props = {
  listing: DirectListingV3
}

export const CancelListingDialog = ({ listing, children }: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false)
  const {
    cancel,
    isLoading,
    error
  } = useCancelListing(listing.id)
  const router = useRouter()

  const handleSubmit = async () => {
    const result = await cancel()
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
            この出品を取り消しますか
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <ListingCard listing={listing}/>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
          >取り消す</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

