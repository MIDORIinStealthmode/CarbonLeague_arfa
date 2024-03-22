'use client'

import {NftCard} from "../common/NftCard";
import {CreateListingDialog} from "./CreateListingDialog";
import {useMySuperpowers} from "@/hooks/useSuperpower";
import {useMyListings} from "@/hooks/useMarketplace";
import {useMemo} from "react";
import {DirectListingV3, NFT, Status} from "@thirdweb-dev/sdk";
import {CancelListingDialog} from "@/app/(app)/profile/CancelListingDialog";

export const MyNftList = () => {
  const { data, isLoading, error } = useMySuperpowers()
  const { data: listings } = useMyListings()

  const nftData = useMemo<{ nft: NFT, listing?: DirectListingV3 }[]>(() => {
    if (!data || !listings) return []

    return data.map(nft => {
      return {
        nft,
        listing: listings.find(listing => listing.asset.id === nft.metadata.id)
      }
    })
  }, [data, listings])

  return (
    <div className="flex w-full gap-4 p-2 flex-wrap mt-8">
      {isLoading && (
        <>
          <NftCard />
          <NftCard />
          <NftCard />
        </>
      )}
      {nftData && nftData.map(({ nft, listing }, i) => listing ? (
          <CancelListingDialog listing={listing} key={i}>
            <NftCard nft={nft} isListed={true}/>
          </CancelListingDialog>
        ) : (
          <CreateListingDialog key={i} nft={nft}>
            <NftCard nft={nft} isListed={false}/>
          </CreateListingDialog>
        )
      )}
    </div>
  )
}
