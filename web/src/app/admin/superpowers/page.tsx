import {SuperpowerTable} from "@/app/admin/superpowers/SuperpowerTable";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'

export default async function AdminSuperpowersPage() {
  const superpowers = await prisma.superpower.findMany({
    include: {
      company: true,
      category: true,
    }
  });

  return (
    <SuperpowerTable superpowers={superpowers}/>
  );
}
