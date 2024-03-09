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
import {DirectListingV3} from "@thirdweb-dev/sdk";
import {ListingCard} from "../common/ListingCard";
import {useBuyListing} from "@/hooks/useMarketplace";

type Props = {
  listing?: DirectListingV3
  onClose: () => void
}

export const BuyListingDialog = ({ listing, onClose }: Props) => {
  const { buy, isLoading, error } = useBuyListing()

  const handleSubmit = async () => {
    if (!listing) return

    const result = await buy(listing.id)
    console.log(result)
    onClose()
  }

  return (
    <Dialog open={!!listing}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Listing</DialogTitle>
          <DialogDescription>
            このNFTを購入しますか
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ListingCard listing={listing}/>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>
            キャンセル
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
          >購入</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

