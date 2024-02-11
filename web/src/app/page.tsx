'use client'
import React from 'react';
import styles from './Home.module.css';
import { useState } from 'react';
import { NextPage } from 'next'; 
import { Login } from "../components/backend/login";
import { Button } from "../components/ui/button";


const Home: NextPage = () => {
  const [isModalOpen, setIsOpen] = React.useState(false)
return (
        <div className={styles.container}>
        {!isModalOpen && (
            <div className={styles.card}>
                  <h1 >Onchain Login</h1>
                  <p>Login with only a username and password</p>
                  <button
                  className={styles.loginButton}
                  onClick={() => setIsOpen(true)}>Login</button>
              </div>
          )}
          <Login
          isOpen={isModalOpen}
          onClose={() => setIsOpen(false)}
          />
  </div>
);
};

export default Home;

// 'use client'
// import React from 'react'
// import { ConnectWallet } from "@thirdweb-dev/react";
// import Navbar from "../components/ui/navbar";
// import Sidebar from "../components/ui/sidebar";
// import NFTMarketplace from '@/components/ui/nftmarketplace';


// export default function Home() {
//   return (
//     <div>
//       <Navbar />
//     <main className="">
//       <Sidebar />
//       <div>
//         <h1 className="font-bold text-xl mb-2">Carbon League</h1>
//         <p>Carbon League is a game that rewards you for supporting real-world heros reducing carbon emmisions.</p>
//         <NFTMarketplace />
//       </div>
//     </main>

//     </div>
//   )
// }