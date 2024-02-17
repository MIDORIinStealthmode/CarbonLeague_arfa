'use client'

import {PropsWithChildren} from "react";
import {ThirdwebProvider, embeddedWallet, metamaskWallet, smartWallet} from "@thirdweb-dev/react";
import { metadata } from "./layout";

const activeChain = 'goerli'

export const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[
        smartWallet(
          embeddedWallet(),
          {
            factoryAddress: process.env.NEXT_PUBLIC_SMARTWALETT_ADDRESS,
            gasless: true,
          }
        ),
      ]}
    >
      {children}
    </ThirdwebProvider>
  )
}
