'use client'
import {SidebarItem} from "@/app/(app)/SidebarItem";
import {useUser} from "@thirdweb-dev/react";

export const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-1 pt-1 w-80 min-w-80 text-teal-900 bg-gradient-to-b from-cyan-100 to-cyan-50">
      { user && <SidebarItem href="/profile">My Profile</SidebarItem>}
      <SidebarItem href="/marketplace">Marketplace</SidebarItem>
      <SidebarItem href="/competitions">Competition</SidebarItem>
    </div>
  )
}
