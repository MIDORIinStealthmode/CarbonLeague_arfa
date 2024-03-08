'use client'

import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";

type Props = {
  superpowerId: string
  disabled?: boolean
}

export const Mint = ({ superpowerId, disabled }: Props) => {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const { mutate, status } = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/superpowers/${id}/mint`,
        {
          method: 'POST',
          body: JSON.stringify({ address })
        }
      )
      return res.json()
    }
  })
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={(o) => o && setOpen(o)}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Mint</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex gap-4 p-4">
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="NFTを送るアドレス"
          />
          <Button
            onClick={() => {
              mutate(
                superpowerId,
                {
                  onSuccess: () => {
                    router.refresh()
                    setOpen(false)
                  }
                }
              )
            }}
            loading={status === 'loading'}
            disabled={disabled}
          >Mint</Button>
        </div>
        <p>Admin: 0x9fD2b1a1BEAd245825ca3F5505a20987eDC57A2A</p>
      </DialogContent>
    </Dialog>
  )
}
