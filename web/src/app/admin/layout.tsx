import {PropsWithChildren} from "react";
import {AdminNav} from "@/app/admin/AdminNav";
import {AdminClientProvider} from "@/app/admin/AdminClientProvider";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 inset-x-0 bg-black text-white p-4">
        管理画面
      </header>
      <div className="flex flex-1">
        <AdminNav />
        <AdminClientProvider>
          <main className="flex-1 w-full h-full">{children}</main>
        </AdminClientProvider>
      </div>
    </div>
  )
}
