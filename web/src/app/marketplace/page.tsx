'use client'
import {ListingList} from "@/app/marketplace/ListingList";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/navbar";



export default function MarketplacePage() {
  return (
    <div>
        <Navbar/>
        <main className="">
        <Sidebar />
        <ListingList />
        </main>
    </div>
  )
}
