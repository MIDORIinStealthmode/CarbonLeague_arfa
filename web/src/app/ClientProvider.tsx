'use client'

import {PropsWithChildren} from "react";
import {ThirdwebProvider} from "@thirdweb-dev/react";

const activeChain = 'ethereum'

export const ClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  )
}
