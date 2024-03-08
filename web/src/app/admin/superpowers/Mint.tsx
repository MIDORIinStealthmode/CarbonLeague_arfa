import {Superpower} from "@/lib/schema/zod";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";

type Props = {
  superpowerId: string
}

export const Mint = ({ superpowerId }: Props) => {
  const { mutate, status } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/superpowers/${id}/mint`,
        {
          method: 'POST'
        }
      )
      return res.json()
    }
  })

  return (
    <Button
      onClick={() => mutate(superpowerId)}
      loading={status === 'pending'}
    >Mint</Button>
  )
}
