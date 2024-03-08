import {MarketplaceFilter, useContract, useDirectListings} from "@thirdweb-dev/react";

export const useMarketplace = () => {
  return useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
}

export const useListings = (filter: MarketplaceFilter) => {
  const { contract } = useMarketplace()
  return useDirectListings(contract, filter)
}
