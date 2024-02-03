import SidebarItem from "./SidebarItem"
import items from "./sidebar.json"
import "./sidebar.css"


export default function Sidebar(){
    return (
        <div className="sidebar">
          { items.map((item, index) => <SidebarItem key={index} item={item} />) }
        </div>
    )
}