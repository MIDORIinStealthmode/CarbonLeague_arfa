import {NFT} from "@thirdweb-dev/sdk";
import Image from "next/image";
import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
  nft?: NFT
}

type AttributeTagProps = {
  nft?: NFT
  type: string
}

const AttributeTag = ({ nft, type }: AttributeTagProps) => {
  if (!nft) return null
  return (
    <div className="inline-block mx-2 bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
      {(nft.metadata.attributes as any).find((attr: any) => attr.trait_type === type).value}
    </div>
  )
}

export const NftCard = ({ nft }: Props) => {
  return (
    <div className="min-w-60 w-60 h-92 bg-white rounded-md overflow-hidden drop-shadow-md">
      <div className="aspect-square w-full">
        {nft ? (
          <Image src={nft.metadata.image!} alt={nft.metadata.image!} width={300} height={300}/>
        ) : (
          <Skeleton className="w-full h-full"/>
        )}
      </div>
      <div className="p-2 text-left h-15">
        {nft ? (<p className="font-bold text-lg mb-2 leading-4">{nft.metadata.name}</p>) : (<Skeleton className="w-20 h-4 mb-2"/>)}
        {nft ? (<p className="text-gray-700 text-base mb-1 leading-4">{nft.metadata.description}</p>) : (<Skeleton className="w-full h-4 mb-1"/>)}
      </div>
      <div className="flex overflow-scroll h-8">
        <AttributeTag nft={nft} type={"company"}/>
        <AttributeTag nft={nft} type={"category"}/>
        <AttributeTag nft={nft} type={"year"}/>
        <AttributeTag nft={nft} type={"score"}/>
      </div>
    </div>
  )
};
