'use client';

import prisma from "@/lib/prisma";
import {Button} from "@/components/ui/button";
import { ResultCall } from "./ResultCall";

type Props = {
    competitionId: string;
    newYear: number;
  };
  

export default function ResultPage() {
  return (
    <div>
      <h1>Result</h1>
      <ResultCall 
        competitionId="60eef0b9-d9f0-4d29-b7c2-f603107a9c7f"
        newYear={2022}
      />
      
    </div>
      
  );
}