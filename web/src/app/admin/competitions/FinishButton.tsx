'use client'

import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";

type Props = {
  competitionId: string
}

export const FinishButton = ({ competitionId }: Props) => {
  const router = useRouter()
  const { mutate, isLoading } = useMutation(
    () => fetch(
      `/api/admin/competitions/${competitionId}/finish`,
      { method: 'POST' }
    )
  )

  return (
    <Button disabled={isLoading} onClick={() => mutate(undefined, { onSuccess: router.refresh })}>
      Finish
    </Button>
  )
}
