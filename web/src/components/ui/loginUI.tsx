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
            <Button
            className=""
            onClick={() => setIsOpen(true)}>Login</Button>
          )}
          <Login
          isOpen={isModalOpen}
          onClose={() => setIsOpen(false)}
          />
        </div>
    );
}