'use client'

import { useNFTs, useContract, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";
import { Home } from "./myNFTMedia";

const contractAddress = "0x1b752d3851c1255A4900F8ed34727Cf2cc8185c2"

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
                        <Image src={nft.metadata.image!} alt={nft.metadata.image!} width={300} height={300}/>
                        
                
                    </li>
                ))}
            </ul>
        
        )}
    </div>
)
}



