'use client'
import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/sidebar";
import NFTMarketplace from '@/components/ui/nftmarketplace';

export default function Home() {
  return (
    <div>
      <Navbar />
    <main className="">
      <Sidebar />
      <div>
        <h1 className="font-bold text-xl mb-2">Carbon League</h1>
        <p>Carbon League is a game that rewards you for supporting real-world heros reducing carbon emmisions.</p>
        <NFTMarketplace />
      </div>
    </main>

    </div>
  )
}