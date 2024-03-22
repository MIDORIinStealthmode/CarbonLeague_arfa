'use client'

import {ConnectWallet} from "@thirdweb-dev/react";
import {useRouter} from "next/navigation";

export const WalletButton = () => {
  const router = useRouter()

  const onLogout = () => {
    router.replace('/')
  }

  return (
    <ConnectWallet
      btnTitle="Sign Up & Sign In"
      theme="light"
      dropdownPosition={{
        side: "bottom",
        align: "center",
      }}
      auth={{ onLogout }}
    />
  )
}
