'use client'

import { useState } from "react";
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
import {DirectListingV3, toEther} from "@thirdweb-dev/sdk";
import {useAddress} from "@thirdweb-dev/react";
import {ListingCard} from "../common/ListingCard";
import {useBuyListing} from "@/hooks/useMarketplace";
import {CheckoutWithCard} from "@thirdweb-dev/react";

type Props = {
  listing?: DirectListingV3
  onClose: () => void
}

export const BuyListingDialog = ({ listing, onClose }: Props) => {
  const [checkoutCardOpen, setCheckoutCardOpen] = useState(false)
  const { buy, isLoading, error } = useBuyListing()
  const address = useAddress()

  const handleSubmit = async () => {
    if (!listing) return

    const result = await buy(listing.id)
    console.log(result)
    onClose()
  }

  return (
    <>
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
          >購入(ETH)</Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={() => setCheckoutCardOpen(true)}
          >購入(CreditCard)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog open={checkoutCardOpen && !!listing}>
      <DialogContent>
      <CheckoutWithCard
        clientId={process.env.NEXT_PUBLIC_API_CLIENT_ID}
        configs={{
          // Registered contract ID
          contractId: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ID!,
          // Buyer wallet address
          walletAddress: address !== undefined ? address : "",
          mintMethod: {
            name: "buyFromListing",
            args: {
              _listingId: listing !== undefined ? listing.id : 0,
              _buyFor: address,
              _quantity: 1,
              _currency: "ETH",
              _expectedTotalPrice: toEther(listing !== undefined ? listing.pricePerToken : 0),
            },
            payment: {
              value: toEther(listing !== undefined ? listing.pricePerToken : 0),
              currency: "ETH",
            },
          },
        }}
        onPaymentSuccess={(result) => {
          console.log("Payment successful:", result);
        }}
      />
      <Button onClick={() => setCheckoutCardOpen(false)}>
            キャンセル
          </Button>
      </DialogContent>
  </Dialog>
  </>
  )
}

