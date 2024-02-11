'use client'
import React from 'react';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { NextPage } from 'next'; 
import { Login } from "../components/backend/login";
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Button</Button>
}



const Home: NextPage = () => {
    const [isModalOpen, setIsOpen] = React.useState(false)
  return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {!isModalOpen && (
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <h1>Onchain Login</h1>
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