import {MarketplaceFilter, useContract, useCreateDirectListing, useDirectListings} from "@thirdweb-dev/react";
import {NFT} from "@thirdweb-dev/sdk";

export const useMarketplace = () => {
  return useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
}

export const useListings = (filter: MarketplaceFilter) => {
  const { contract } = useMarketplace()
  return useDirectListings(contract, filter)
}

export const useCreateListing = (nft: NFT) => {
  const { contract } = useMarketplace()
  const {
    data: listings,
    isLoading: listLoading,
    error: listError
  } = useListings({ tokenId: nft.metadata.id });
  const listing = listings?.[0];
  const {
    mutateAsync: createDirectListing,
    isLoading: createLoading,
    error: createError,
  } = useCreateDirectListing(contract);

  const isLoading = listLoading || createLoading;
  const error = listError || createError;

}
