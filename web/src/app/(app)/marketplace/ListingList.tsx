'use client'

import {ListingCard} from "../common/ListingCard";
import {BuyListingDialog} from "./BuyListingDialog";
import {useListings} from "@/hooks/useMarketplace";
import {useEffect, useRef, useState} from "react";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";
import {DirectListingV3} from "@thirdweb-dev/sdk";

const PER_PAGE = 10

export const ListingList = () => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [listing, setListing] = useState<DirectListingV3>()
  const ref = useRef(null)
  const {data: listings, isLoading, error} = useListings({
    start: 0,
    count: PER_PAGE * page,
  });
  useIntersectionObserver<HTMLDivElement>(ref, () => isLoading || setPage((prev) => prev + 1))

  useEffect(() => {
    if (listings && (listings.length < page * PER_PAGE)) {
      setHasMore(false)
    }
  }, [listings]);

  return (
    <div className="flex gap-4 flex-wrap mt-8">
      {listings && listings.map((listing, i) => (
        <a onClick={() => setListing(listing)} key={i}>
          <ListingCard listing={listing}/>
        </a>
      ))}
      {isLoading && <ListingCard />}
      {hasMore && <div ref={ref} />}
      <BuyListingDialog listing={listing} onClose={() => setListing(undefined)} />
    </div>
  )
}
