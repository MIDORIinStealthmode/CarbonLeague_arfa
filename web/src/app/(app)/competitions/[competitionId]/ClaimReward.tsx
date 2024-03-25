'use client'

import { useRouter } from "next/navigation"
import {useMutation} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";

export const ClaimReward = ({ competitionId, resultId, received }: {competitionId: string, resultId: string, received: boolean}) => {
  const router = useRouter()
  const { mutate, isLoading } = useMutation(
    () => fetch(
      `/api/competitions/${competitionId}/results/${resultId}/claim-reward`,
      { method: 'POST' }
    )
  )

  if (received) {
    return (
      <Button disabled={true}>
        Reward Claimed
      </Button>
    )
  } else {
    return (
      <Button
        disabled={isLoading}
        onClick={() => mutate(undefined, { onSuccess: router.refresh })}
      >
        Claim Reward
      </Button>
    )
  }
}