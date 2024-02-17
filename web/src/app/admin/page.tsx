import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1>管理画面</h1>
      <Link href={"/admin/superpowers"}>Superpower</Link>
    </div>
  );
}
