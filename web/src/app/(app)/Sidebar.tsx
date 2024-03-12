import {SidebarItem} from "@/app/(app)/SidebarItem";
import {getUserModel} from "@/app/(app)/thirdwebAuth";

export const Sidebar = async () => {
  const user = await getUserModel()

  return (
    <div className="flex flex-col gap-1 pt-1 bg-neutral-900 w-80 min-w-80 text-white">
      { user && <SidebarItem href="/profile">My Profile</SidebarItem>}
      <SidebarItem href="/marketplace">Marketplace</SidebarItem>
      <SidebarItem href="/competitions">Competition</SidebarItem>
    </div>
  )
}
