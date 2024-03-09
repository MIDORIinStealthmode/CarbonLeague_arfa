'use client'
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import { Superpower } from "@/lib/schema/zod";

type Props = {
  competitionId: string;
  newYear: number;
};

type SuperpowerRes = {
  superpowerId: string;
  totalScore: number;
};

//APIコールして、コンペティションの結果（superpower, total score）を取得する
export const ResultCall = ({ competitionId, newYear }: Props) => {
  const { data: superpowers, isLoading, error } = useQuery<SuperpowerRes[]>(['superpowers', competitionId, newYear], async () => {
    const res = await fetch(`/api/competition/?competitionID=${competitionId}&newYear=${newYear}`);
    if (!res.ok) {
      throw new Error('Fetching error');
    }
    const data = await res.json();
    return data;
  });
}
