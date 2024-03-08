import prisma from "@/lib/prisma";
import {CategoryList} from "@/app/admin/categories/CategoryList";

export const dynamic = 'force-dynamic'

export default async function AdminCompaniesPage() {
  const categories = await prisma.category.findMany();

  return (
    <CategoryList categories={categories} />
  );
}
