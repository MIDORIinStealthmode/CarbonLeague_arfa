import prisma from "@/lib/prisma";
import {CompetitionList} from "./CompetitionList"

export default async function AdminCompetitionPage() {
  const competitions = await prisma.competition.findMany();

  return (
    <div>
      <CompetitionList competitions={competitions} />
    </div>
  );
}
