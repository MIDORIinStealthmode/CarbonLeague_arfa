import React, {PropsWithChildren} from "react";
import {ClientProvider} from "@/app/(app)/ClientProvider";
import { Navbar } from "@/app/(app)/Navbar";
import { Sidebar } from "@/app/(app)/Sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <ClientProvider>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="">
          {children}
        </main>
      </div>
    </ClientProvider>
  )
}
