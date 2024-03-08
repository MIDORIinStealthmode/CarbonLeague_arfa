'use client'
import React from 'react';
import styles from '../../app/Home.module.css';
import { useState } from 'react';
import { NextPage } from 'next'; 
import { Login } from "../backend/login";
import { Button } from "./button";

export default function LoginUI() {
    const [isModalOpen, setIsOpen] = React.useState(false)
    return (
        <div className="">
        {!isModalOpen && (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <h1 >Onchain Login</h1>
                  <Button
                  className=""
                  onClick={() => setIsOpen(true)}>Login</Button>
              </div>
          )}
          <Login
            isOpen={isModalOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
    );
}