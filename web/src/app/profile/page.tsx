'use client'
import React from 'react';
import { MyNFTs } from './myNFTList'
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/navbar";

export default function ProfilePage() {
  return (
    <div>
      <Navbar/>
      <main className="">
      <Sidebar />
      Profile
      <MyNFTs />
      </main>
    </div>
  )
}
