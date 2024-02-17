import prisma from "@/lib/prisma";
import {CompanyTable} from "@/app/admin/companies/CompanyTable";
import {Button} from "@/components/ui/button";

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany();



  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between align-center">
        <h1>会社一覧</h1>
        
      </div>

      <CompanyTable data={companies} />
    </div>
  );
}
