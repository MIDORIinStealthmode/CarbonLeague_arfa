'use client'

import { ConnectWallet } from "@thirdweb-dev/react";
export default function Home() {
  return (
    <main className="">
      <ConnectWallet
        dropdownPosition={{
          side: "bottom",
          align: "center",
        }}
      />
    </main>
  )
}
