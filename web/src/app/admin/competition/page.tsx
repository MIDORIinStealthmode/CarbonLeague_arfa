import prisma from "@/lib/prisma";
import {Button} from "@/components/ui/button";
import {EndCompetition} from "./endCompetition";
import {CompetitionList} from "./CompetitionList"

export default async function AdminCompetitionPage() {
      const competitions = await prisma.competition.findMany();

  return (
    <div>
      <h1>Competition</h1>
      <CompetitionList competitions={competitions} />
    </div>
    
  );
}