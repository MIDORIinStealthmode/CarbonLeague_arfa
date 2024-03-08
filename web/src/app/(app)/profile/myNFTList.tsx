'use client'

import {useContract, useAddress, useOwnedNFTs} from "@thirdweb-dev/react";
import {NftCard} from "./NftCard";
import {CreateListingDialog} from "./CreateListingDialog";

const contractAddress = process.env.NEXT_PUBLIC_SUPERPOWER_ADDRESS

export const MyNFTs = () => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);

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



