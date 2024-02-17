import {PropsWithChildren} from "react";
import {AdminNav} from "@/app/admin/AdminNav";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="sticky top-0 inset-x-0 h-10 bg-black text-white">
        管理画面やで
      </header>
      <div className="flex">
        <AdminNav />
        <main>{children}</main>
      </div>
    </div>
  )
}
