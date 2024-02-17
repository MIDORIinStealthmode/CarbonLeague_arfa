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
import {PropsWithChildren} from "react";
import {NftCard} from "@/app/profile/NftCard";
import {
  useAddress,
  useBuyDirectListing,
  useContract,
  useCreateDirectListing,
  useDirectListings
} from "@thirdweb-dev/react";
import {ListingCard} from "@/app/marketplace/ListingCard";

type Props = {
  listing: DirectListingV3 // TODO listingの代わりにlistingIdとlisting.asset<NFTMEtadata>の方が良き
}

export const BuyListingDialog = ({ listing, children }: PropsWithChildren<Props>) => {
  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
  const {
    mutateAsync: buyListing,
    isLoading,
    error
  } = useBuyDirectListing(contract);

  const handleSubmit = async () => {
    const result = await buyListing({
      listingId: listing.id,
      quantity: "1",
      buyer: address!,
    })
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
            onClick={handleSubmit}
          >購入</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

