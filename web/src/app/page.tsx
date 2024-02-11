'use client'
import React from 'react';
import styles from './Home.module.css';
import { NextPage } from 'next';
import { Login } from "../components/backend/login";
import Sidebar from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/navbar";

const Home: NextPage = () => {
  const [isModalOpen, setIsOpen] = React.useState(false)
  return (
    <div>
      <Navbar />
      <main className="">
        <Sidebar />
        <div>
          <div className={styles.container}>
            {!isModalOpen && (
              <div className={styles.card}>
                <h1 >Onchain Login</h1>
                <p>Login with only a username and password</p>
                <button
                  className={styles.loginButton}
                  onClick={() => setIsOpen(true)}
                >
                  Login
                </button>
              </div>
            )}
            <Login
              isOpen={isModalOpen}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
