import "./Sidebar.css"
import Link from "next/link"



export default function Sidebar(){
    return (
        <div className="sidebar">
          <Link href="/marketplace">
            <button>Marketplace</button>
          </Link>
          <Link href="/competitions">
            <button>Competitions</button>
          </Link>
          <Link href="/profile">
            <button>My Profile</button>
          </Link>
        </div>
    )
}