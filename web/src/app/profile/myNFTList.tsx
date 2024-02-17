'use client'

import {useNFTs, useContract, useAddress, useOwnedNFTs} from "@thirdweb-dev/react";
import Image from "next/image";
import { Home } from "./myNFTMedia";
import {NftCard} from "@/app/profile/NftCard";
import {useState} from "react";
import {CreateListingDialog} from "@/app/profile/CreateListingDialog";

const contractAddress = process.env.NEXT_PUBLIC_SUPERPOWER_ADDRESS

export const MyNFTs = () => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);

  // console.log(address, error)

  return (
    <div>
      <h1>My NFTs</h1>
      {isLoading && <p>Loading...</p>}
      {data && (
        <ul>
          {data.map((nft, i) => (
            <CreateListingDialog key={i} nft={nft}>
              <NftCard nft={nft}/>
            </CreateListingDialog>
          ))}
        </ul>
      )}
    </div>
)
}



