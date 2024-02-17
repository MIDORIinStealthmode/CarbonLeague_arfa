'use client'

import { useNFTs, useContract, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { Home } from "./myNFTMedia";

const contractAddress = "0xe3b15B016864120481DbD19c35797dc5C992bAd5"

export const MyNFTs = () => {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useNFTs(contract);
  console.log(data, error);
  return (
    <div>
        <h1>My NFTs</h1>
        {isLoading && <p>Loading...</p>}
        {data && (
            <ul>
                {data.map((nft, i) => (
                    <li key={i}>
                        {nft.owner}
                        <Image src={nft.metadata.image!} alt={nft.metadata.image!}/>
                        
                
                    </li>
                ))}
            </ul>
        
        )}
    </div>
)
}



