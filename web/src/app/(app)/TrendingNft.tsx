'use client'

import {useListings} from "@/hooks/useMarketplace";
import {ListingCard} from "@/app/(app)/common/ListingCard";
import Link from "next/link";

export const TrendingNft = () => {
  const { data, isLoading } = useListings({
    start: 0,
    count: 5,
  })

  return (
    <div className="py-4 w-full">
      <div className="flex gap-4 items-center">
        <h1 className="font-bold text-neutral-900 text-2xl">Trending NFTs</h1>
        <Link href="/marketplace" className="font-bold text-neutral-600 text-xl underline">More</Link>
      </div>
      <div className="flex w-full gap-4 p-2 overflow-x-auto">
        {isLoading && (
          <>
            <ListingCard />
            <ListingCard />
            <ListingCard />
            <ListingCard />
          </>
        )}
        {data && data.map((listing, i) => (
          <ListingCard listing={listing} key={i} />
        ))}
      </div>
    </div>
  )
}
