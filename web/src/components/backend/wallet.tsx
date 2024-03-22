import { LocalWallet, SmartWallet } from "@thirdweb-dev/wallets";
import {
  ThirdwebSDK,
  isContractDeployed,
} from "@thirdweb-dev/react";

export function createSmartWallet(): SmartWallet {
  const smartWallet = new SmartWallet({
    chain: process.env.NEXT_PUBLIC_CHAIN_ID!,
    factoryAddress: process.env.NEXT_PUBLIC_ACCOUNT_FACTORY_ADDRESS!,
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
    gasless: true,
  });
  return smartWallet;
}

//get wallet address from our account factory
export async function getWalletAddressForUser(
  sdk: ThirdwebSDK,
  username: string
): Promise<string> {
  const factory = await sdk.getContract(process.env.NEXT_PUBLIC_ACCOUNT_FACTORY_ADDRESS!);
  const smartWalletAddress: string = await factory.call("accountOfUsername", [username]);
  return smartWalletAddress;
}
