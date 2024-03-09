'use client'

import {ListingCard} from "../common/ListingCard";
import {BuyListingDialog} from "./BuyListingDialog";
import {useListings} from "@/hooks/useMarketplace";
import {useEffect, useRef, useState} from "react";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";

const PER_PAGE = 10

export const ListingList = () => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const ref = useRef(null)
  useIntersectionObserver<HTMLDivElement>(ref, () => setPage((prev) => prev + 1))

  const {
    data: listings,
    isLoading,
    error,
  } = useListings({
    start: 0,
    count: PER_PAGE * page,
  });

  useEffect(() => {
    if (listings && (listings.length < page * PER_PAGE)) {
      setHasMore(false)
    }
  }, [listings]);

  return (
    <div className="flex gap-4 flex-wrap">
      {isLoading && !listings && (
        <>
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </>
      )}
      {listings && listings.map((listing, i) => (
        <BuyListingDialog key={i} listing={listing}>
          <ListingCard listing={listing}/>
        </BuyListingDialog>
      ))}
      {hasMore && <div ref={ref} />}
    </div>
  )
}
