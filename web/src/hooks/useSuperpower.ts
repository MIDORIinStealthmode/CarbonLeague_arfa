import {useAddress, useContract, useOwnedNFTs} from "@thirdweb-dev/react";

export const useSuperpower = () => {
  return useContract(process.env.NEXT_PUBLIC_SUPERPOWER_ADDRESS);
}

export const useMySuperpowers = () => {
  const { contract } = useSuperpower();
  const address = useAddress();

  return useOwnedNFTs(contract, address);
}
