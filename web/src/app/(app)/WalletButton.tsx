'use client'

import {ConnectWallet} from "@thirdweb-dev/react";

export const WalletButton = () => (
  <ConnectWallet
    dropdownPosition={{
      side: "bottom",
      align: "center",
    }}
  />
)
