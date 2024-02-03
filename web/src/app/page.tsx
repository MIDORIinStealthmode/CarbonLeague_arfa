'use client'
import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import Navbar from "../components/ui/navbar";
import Sidebar from "../components/ui/Sidebar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Sidebar />
    <main className="">
      <h1>Carbon League</h1>
      <p>Carbon League is a game that rewards you for supporting real-world heros reducing carbon emmisions.</p>
    </main>
    </div>
  )
}