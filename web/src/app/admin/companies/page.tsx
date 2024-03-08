import prisma from "@/lib/prisma";
import {CompanyList} from "@/app/admin/companies/CompanyList";

export const dynamic = 'force-dynamic'

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany();

  return (
    <CompanyList companies={companies} />
  );
}
