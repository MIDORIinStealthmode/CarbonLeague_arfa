import {NFT} from "@thirdweb-dev/sdk";
import Image from "next/image";
import React from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
  nft?: NFT
  isListed?: boolean
}

type AttributeTagProps = {
  nft?: NFT
  type: string
}

const AttributeTag = ({ nft, type }: AttributeTagProps) => {
  if (!nft) return null

  const attributes = nft?.metadata?.attributes
  if (!attributes) return null

  return (
    <div className="inline-block mx-1 mb-1 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 bg-gray-200 ">
      {(attributes as any).find((attr: any) => attr.trait_type === type).value}
    </div>
  )
}

export const NftCard = ({ nft, isListed }: Props) => {
  const metadata = nft?.metadata
  const attributes = metadata?.attributes

  return (
    <div className="min-w-60 min-h-96 w-60 h-96 bg-white rounded-md overflow-hidden drop-shadow-md">
      <div className="aspect-square w-full">
        {metadata ? (
          <Image src={metadata.image!} alt={metadata.image!} width={300} height={300}/>
        ) : (
          <Skeleton className="w-full h-full"/>
        )}
      </div>
      <div className="p-2 text-left h-15">
        <div className="flex justify-between">
          {metadata ? (<p className="font-bold text-lg mb-2 leading-4">{metadata.name}</p>) : (<Skeleton className="w-20 h-4 mb-2"/>)}
          {isListed && <div className="bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Listed</div>}
        </div>
        {metadata ? (<p className="text-gray-700 text-base mb-1 leading-4">{metadata.description}</p>) : (<Skeleton className="w-full h-4 mb-1"/>)}
        {attributes ? (<p className="text-teal-700 text-base font-bold mb-1 leading-4">Score: {(attributes as any).find((attr: any) => attr.trait_type === 'score').value}</p>) : (<Skeleton className="w-full h-4 mb-1"/>)}
      </div>
      <div className="flex flex-wrap">
        <AttributeTag nft={nft} type={"company"}/>
        <AttributeTag nft={nft} type={"category"}/>
        <AttributeTag nft={nft} type={"year"}/>
        <AttributeTag nft={nft} type={"score"}/>
      </div>
    </div>
  )
};
