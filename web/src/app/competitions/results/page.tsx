'use client';

import prisma from "@/lib/prisma";
import {Button} from "@/components/ui/button";
import { ResultTable } from "./ResultTable";

type Props = {
    competitionId: string;
    newYear: number;
  };
  

export default function ResultPage() {
  return (
    <div>
      <h1>Competition Result</h1>
      <ResultTable
        competitionId="60eef0b9-d9f0-4d29-b7c2-f603107a9c7f"
        newYear={2022}
      />
      
    </div>
      
  );
}