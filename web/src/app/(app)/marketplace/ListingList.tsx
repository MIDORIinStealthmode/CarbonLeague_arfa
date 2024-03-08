'use client'

import {ListingCard} from "../common/ListingCard";
import {BuyListingDialog} from "./BuyListingDialog";
import {useListings} from "@/hooks/useMarketplace";
import {RefObject, useEffect, useRef, useState} from "react";
import {useInView} from "react-intersection-observer";

export const ListingList = () => {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { ref: loader, inView } = useInView({
    rootMargin: '-50px',
  });

  const {
    data: listings,
    isLoading,
    error,
  } = useListings({
    start: 0,
    count: 10 * page,
  });

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView])

  useEffect(() => {
    if (listings?.length < page * 10) {
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
      {hasMore && <div ref={loader as RefObject<HTMLDivElement>} />}
    </div>
  )
}
