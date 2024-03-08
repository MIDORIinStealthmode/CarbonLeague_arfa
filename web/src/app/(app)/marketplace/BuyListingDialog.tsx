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
import {PropsWithChildren} from "react";
import {ListingCard} from "../common/ListingCard";
import {useBuyListing} from "@/hooks/useMarketplace";

type Props = {
  listing: DirectListingV3 // TODO listingの代わりにlistingIdとlisting.asset<NFTMEtadata>の方が良き
}

export const BuyListingDialog = ({ listing, children }: PropsWithChildren<Props>) => {
  const { buy, isLoading, error } = useBuyListing(listing.id)

  const handleSubmit = async () => {
    const result = await buy()
    console.log(result)
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
            このNFTを購入しますか
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ListingCard listing={listing}/>
        </div>
        <DialogFooter>
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

