import {PropsWithChildren} from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header>
        管理画面やで
      </header>
      <nav>
        
      </nav>
      <main>{children}</main>
    </div>
  )
}