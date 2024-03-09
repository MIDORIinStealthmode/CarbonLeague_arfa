import prisma from "@/lib/prisma";
import {ResultList} from "./ResultList";

export default async function CompetitionResultPage() {
  const superpowersResult = await prisma.superpower.findMany({
    include: {
      company: true,
      category: true,
    }
  });

  return (
    <ResultList/>
  );
}
