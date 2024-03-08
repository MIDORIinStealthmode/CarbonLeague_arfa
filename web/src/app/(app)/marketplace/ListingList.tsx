'use client'

import {useContract, useDirectListings} from "@thirdweb-dev/react";
import {ListingCard} from "../common/ListingCard";
import {BuyListingDialog} from "./BuyListingDialog";

export const ListingList = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
  const {
    data: directListings,
    isLoading,
    error,
  } = useDirectListings(contract);

  return (
    <div className="flex gap-4 flex-wrap">
      {isLoading && <p>Loading...</p>}
      {directListings && directListings.map((listing, i) => (
        <BuyListingDialog key={i} listing={listing}>
          <ListingCard listing={listing}/>
        </BuyListingDialog>
      ))}
    </div>
  )
}
