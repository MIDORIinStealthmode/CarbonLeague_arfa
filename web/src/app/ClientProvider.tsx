'use client'

import {PropsWithChildren} from "react";
import {ThirdwebProvider, embeddedWallet, smartWallet} from "@thirdweb-dev/react";
import {QueryProvider} from "@/app/QueryProvider";

export const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThirdwebProvider
      activeChain={process.env.NEXT_PUBLIC_CHAIN_ID!}
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
      <QueryProvider>
        {children}
      </QueryProvider>
    </ThirdwebProvider>
  )
}
