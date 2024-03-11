'use client'

import {ConnectWallet} from "@thirdweb-dev/react";
import {useRouter} from "next/navigation";

export const WalletButton = () => {
  const router = useRouter()

  return (
    <ConnectWallet
      dropdownPosition={{
        side: "bottom",
        align: "center",
      }}
      auth={{
        onLogin: router.refresh,
        onLogout: () => router.push('/')
      }}
    />
  )
}
