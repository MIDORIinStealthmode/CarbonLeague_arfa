import prisma from "@/lib/prisma";
import {SuperpowerList} from "@/app/admin/superpowers/SuperpowerList";

export const dynamic = 'force-dynamic'

export default async function AdminSuperpowersPage() {
  const superpowers = await prisma.superpower.findMany({
    include: {
      company: true,
      category: true,
    }
  });

  return (
    <SuperpowerList superpowers={superpowers}/>
  );
}
