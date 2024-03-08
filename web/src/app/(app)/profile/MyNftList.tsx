'use client'

import {NftCard} from "../common/NftCard";
import {CreateListingDialog} from "./CreateListingDialog";
import {useMySuperpowers} from "@/hooks/useSuperpower";
import {Loader2} from "lucide-react";

export const MyNftList = () => {
  const { data, isLoading, error } = useMySuperpowers()

  return (
    <div className="flex w-full gap-4 p-2 flex-wrap">
      {isLoading && (
        <>
          <NftCard />
          <NftCard />
          <NftCard />
        </>
      )}
      {data && data.map((nft, i) => (
        <CreateListingDialog key={i} nft={nft}>
          <NftCard nft={nft}/>
        </CreateListingDialog>
      ))}
    </div>
  )
}
