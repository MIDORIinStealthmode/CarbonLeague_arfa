import React from 'react';
import './navbar.css';
import { ConnectWallet } from "@thirdweb-dev/react";

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Logo Section */}
            <div className="navbar-logo">Logo Here</div>
            
            {/* Navigation Links */}
            <ul className="navbar-links">
                    <ConnectWallet
                dropdownPosition={{
                side: "bottom",
                align: "center",
                }}
            />
            </ul>
        </nav>
    );
}

export default Navbar;