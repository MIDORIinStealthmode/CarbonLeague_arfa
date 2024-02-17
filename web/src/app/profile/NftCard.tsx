import {NFT} from "@thirdweb-dev/sdk";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

type Props = {
  nft: NFT
}

type AttributeTagProps = {
  nft: NFT
  type: string
}

const AttributeTag = ({ nft, type }: AttributeTagProps) => {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {(nft.metadata.attributes as any).find((attr: any) => attr.trait_type === type).value}
    </span>
  )
}

export const NftCard = ({ nft }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image src={nft.metadata.image!} alt={nft.metadata.image!} width={150} height={150}/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nft.metadata.name}</div>
        <p className="text-gray-700 text-base">
          {nft.metadata.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <AttributeTag nft={nft} type={"company"}/>
        <AttributeTag nft={nft} type={"category"}/>
        <AttributeTag nft={nft} type={"year"}/>
        <AttributeTag nft={nft} type={"score"}/>
      </div>
    </div>
  )
};
