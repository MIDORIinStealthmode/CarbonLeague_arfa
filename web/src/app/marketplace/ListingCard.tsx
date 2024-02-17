'use client'

import {DirectListingV3, NFT} from "@thirdweb-dev/sdk";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

type Props = {
  listing: DirectListingV3 // TODO listingの代わりにlistingIdとlisting.asset<NFTMEtadata>の方が良き
}

export const ListingCard = ({ listing }: Props) => {
  console.log(listing.asset)
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image src={listing.asset.image!} alt={listing.asset.image!} width={150} height={150}/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{listing.asset.name}</div>
        <p className="text-gray-700 text-base">
          {listing.asset.description}
        </p>
        <p>{listing.pricePerToken}</p>
      </div>
    </div>
  )
};
