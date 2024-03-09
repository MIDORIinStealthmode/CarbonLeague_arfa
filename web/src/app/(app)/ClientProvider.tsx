'use client'

import {PropsWithChildren} from "react";
import {ThirdwebProvider, embeddedWallet, smartWallet} from "@thirdweb-dev/react";
import {Sepolia} from "@thirdweb-dev/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const activeChain = process.env.NEXT_PUBLIC_CHAIN_ID === '11155111' ? Sepolia : process.env.NEXT_PUBLIC_CHAIN_ID!

export const ClientProvider = ({ children }: PropsWithChildren) => {
  const queryProvider = new QueryClient()

  return (
    <QueryClientProvider client={queryProvider}>
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
        authConfig={{
          authUrl: "/api/auth",
          domain: process.env.NEXT_PUBLIC_URL,
        }}
        queryClient={queryProvider}
      >
        {children}
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}
