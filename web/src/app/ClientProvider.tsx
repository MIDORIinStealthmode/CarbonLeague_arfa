'use client'

import {PropsWithChildren} from "react";
import {ThirdwebProvider, embeddedWallet, smartWallet} from "@thirdweb-dev/react";
import {QueryProvider} from "@/app/QueryProvider";
import {Sepolia} from "@thirdweb-dev/chains";

const activeChain = process.env.NEXT_PUBLIC_CHAIN_ID === '11155111' ? Sepolia : process.env.NEXT_PUBLIC_CHAIN_ID!

export const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <ThirdwebProvider
        activeChain={activeChain}
        clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        supportedWallets={[
          smartWallet(
            embeddedWallet(),
            {
              factoryAddress: process.env.NEXT_PUBLIC_ACCOUNT_FACTORY_ADDRESS!,
              gasless: true,
            }
          ),
        ]}
      >
        {children}
      </ThirdwebProvider>
    </QueryProvider>
  )
}
