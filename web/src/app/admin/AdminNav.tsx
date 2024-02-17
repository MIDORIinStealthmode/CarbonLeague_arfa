import Link from "next/link";

export const AdminNav = () => {
  return (
    <ul>
      <li>
        <Link href={"/admin/superpowers"}>Superpower</Link>
        <Link href={"/admin/companies"}>会社</Link>
      </li>
    </ul>
  )
}
