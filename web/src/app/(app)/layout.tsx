import React, {PropsWithChildren} from "react";
import {ClientProvider} from "@/app/(app)/ClientProvider";
import { Navbar } from "@/app/(app)/Navbar";
import { Sidebar } from "@/app/(app)/Sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <ClientProvider>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden p-4">
          {children}
        </main>
      </div>
    </ClientProvider>
  )
}
