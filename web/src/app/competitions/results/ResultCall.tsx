import prisma from "@/lib/prisma";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import { use, useState } from "react";
import { Superpower } from "@/lib/schema/zod";

type Props = {
    competitionId: string;
    newYear: number;
  };
  
  //APIコールして、コンペティションの結果（superpower, total score）を取得する
  export const ResultCall = ({ competitionId, newYear }: Props) => {
    const apicall = async () => {
      const res = await fetch(`/api/competition/?competitionID=${competitionId}&newYear=${newYear}`);
      if (!res.ok) {
        throw new Error('Fetching error');
      }
      const data = await res.json();
      console.log(data);
      return data;
    }

    return (
        <Button onClick={apicall}>結果を取得</Button>
    );
  };
