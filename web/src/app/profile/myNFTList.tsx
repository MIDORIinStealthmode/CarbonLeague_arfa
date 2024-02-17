'use client'

import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";
import Image from "next/image";

const contractAddress = "0x4d4C08B62CF75D63aef196Ae2ade89D559f7AE71"

export const MyNFTs = () => {
    const address = useAddress();
    const { contract } = useContract(contractAddress);
    const { data, isLoading, error } = useOwnedNFTs(contract, address); 
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
                            <Image src={nft.metadata.image!} alt={nft.metadata.name!.toString()}/>
                    
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

};
