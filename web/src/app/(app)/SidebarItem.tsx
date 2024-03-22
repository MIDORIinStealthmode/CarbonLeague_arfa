'use client'

import Link from "next/link";
import {PropsWithChildren} from "react";
import {usePathname} from "next/navigation";

type Props = {
  href: string
}

export const SidebarItem = ({ href, children }: PropsWithChildren<Props>) => {
  const pathname = usePathname()
  const active = href.split('/')[1] === pathname.split('/')[1]
  return (
    <Link href={href} className={`px-2 py-4 font-bold ${active && 'bg-cyan-900 text-white'} hover:bg-cyan-700 hover:text-white`}>
      {children}
    </Link>
  )
}
