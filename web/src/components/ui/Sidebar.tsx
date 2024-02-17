import SidebarItem from "./SidebarItem"
import items from "./sidebar.json"
import "./Sidebar.css"
import Link from "next/link"


export default function Sidebar(){
    return (
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
          <Link href="/profile">Go to My Profile</Link>
        </div>
    )
}