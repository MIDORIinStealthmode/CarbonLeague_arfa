import prisma from "@/lib/prisma";

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany();

  return (
    <div>
      <h1>会社一覧</h1>

      <table>
        {companies.map((company) => (
          <li key={company.id}>{company.id} {company.name}</li>
        ))}
      </table>
    </div>
  );
}