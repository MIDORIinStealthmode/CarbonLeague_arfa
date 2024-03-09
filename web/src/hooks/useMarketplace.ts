import {
  MarketplaceFilter,
  useAddress, useBuyDirectListing,
  useCancelDirectListing,
  useContract,
  useCreateDirectListing,
  useValidDirectListings
} from "@thirdweb-dev/react";
import {NFT} from "@thirdweb-dev/sdk";

export const useMarketplace = () => {
  return useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
}

export const useListings = (filter: MarketplaceFilter) => {
  const { contract } = useMarketplace()
  return useValidDirectListings(contract, filter)
}

export const useMyListings = () => {
  const address = useAddress()
  return useListings({ seller: address })
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

  const createListing = async (price: number) => {
    await createDirectListing({
      tokenId: nft.metadata.id,
      pricePerToken: price,
      assetContractAddress: process.env.NEXT_PUBLIC_SUPERPOWER_ADDRESS!,
    });
  }

  const isLoading = listLoading || createLoading;
  const error = listError || createError;

  return {
    listing,
    createListing,
    isLoading,
    error
  }
}

export const useCancelListing = (listingId: string) => {
  const { contract } = useMarketplace()
  const {
    mutateAsync: cancelDirectListing,
    isLoading,
    error
  } = useCancelDirectListing(contract);

  const cancel = () => {
    return cancelDirectListing(listingId)
  }

  return {
    cancel,
    isLoading,
    error
  };
}

export const useBuyListing = (listingId: string) => {
  const address = useAddress();
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace-v3");
  const {
    mutateAsync: buyListing,
    isLoading,
    error
  } = useBuyDirectListing(contract);
  
  const buy = () => {
    if (!address) return Promise.reject(new Error("No address")); 

    return buyListing({
      listingId,
      buyer: address,
      quantity: 1
    });
  }
  
  return {
    buy,
    isLoading,
    error
  }
}
