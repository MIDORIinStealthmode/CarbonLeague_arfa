import Link from "next/link";

export const AdminNav = () => {
  return (
    <nav className="border-r">
      <ul className="flex flex-col gap-1">
        <li><Link href={"/admin"} className="block p-4 hover:bg-gray-100">Top</Link></li>
        <li><Link href={"/admin/superpowers"} className="block p-4 hover:bg-gray-100">Superpower</Link></li>
        <li><Link href={"/admin/companies"} className="block p-4 hover:bg-gray-100">Company</Link></li>
        <li><Link href={"/admin/categories"} className="block p-4 hover:bg-gray-100">Category</Link></li>
        <li><Link href={"/admin/competitions"} className="block p-4 hover:bg-gray-100">Competition</Link></li>
      </ul>
    </nav>
  )
}
