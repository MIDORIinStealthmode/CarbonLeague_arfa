import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {PropsWithChildren} from "react";
import {cn} from "@/lib/utils";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CARBON LEAGUE',
  description: 'CARBON LEAGUE is a platform for NFTs and save the earth.',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen flex flex-col')}>
        {children}
      </body>
    </html>
  )
}
