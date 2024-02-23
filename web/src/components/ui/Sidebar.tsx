import "./Sidebar.css"
import Link from "next/link"



export default function Sidebar(){
    return (
        <div className="sidebar">
          <button>Marketplace</button>
          <button>Competetion</button>
          <Link href="/profile">
            <button>My Profile</button>
          </Link>
        </div>
    )
}