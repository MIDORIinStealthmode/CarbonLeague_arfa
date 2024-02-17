'use client'

import {PropsWithChildren} from "react";
import {ThirdwebProvider, embeddedWallet, metamaskWallet} from "@thirdweb-dev/react";
import { metadata } from "./layout";

const activeChain = 'goerli'

export const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedWallets={[
        embeddedWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  )
}
