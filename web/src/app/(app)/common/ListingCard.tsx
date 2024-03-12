'use client'

import {DirectListingV3, NFT} from "@thirdweb-dev/sdk";
import Image from "next/image";
import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
  listing?: DirectListingV3
}

export const ListingCard = ({ listing }: Props) => {
  return (
    <div className="min-w-60 w-60 h-92 bg-white rounded-md overflow-hidden drop-shadow-md">
      <div className="aspect-square w-full">
        {listing ? (
          <Image src={listing.asset.image!} alt={listing.asset.image!} width={300} height={300}/>
        ) : (
          <Skeleton className="w-full h-full"/>
        )}
      </div>
      <div className="px-4 py-2">
        {listing ? (
          <div className="font-bold text-xl mb-2 leading-4	">{listing.asset.name}</div>
        ) : (
          <Skeleton className="w-20 h-4 mb-2"/>
        )}
        {listing ? (
          <p className="text-gray-700 text-base mb-1 leading-4	">{listing.asset.description}</p>
        ) : (
          <Skeleton className="w-full h-4 mb-1"/>
        )}
        {listing ? (
          <p className="text-gray-700 text-base mb-1 leading-4	">{(Number(listing.pricePerToken) / 1000000000000000000).toFixed(3)} ETH</p>
        ) : (
          <Skeleton className="w-20 h-4 mb-1"/>
        )}
      </div>
    </div>
  )
};
