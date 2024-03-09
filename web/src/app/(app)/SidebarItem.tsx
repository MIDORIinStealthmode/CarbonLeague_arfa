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
    <Link href={href} className={`p-2 my-2 ${active && 'bg-neutral-500'}`}>
      {children}
    </Link>
  )
}
