'use client'
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import z from 'zod';


// 更新するための入力データのスキーマを定義
const UpdateSchema = z.object({
  newYear: z.number(), // 更新する年
});

type Update = z.infer<typeof UpdateSchema>



type Props = {
  competitionId?: string
  onClose: () => void
}

export const EndCompetition = ({ competitionId, onClose }: Props) => {
  const form = useForm<Update>()
  const router = useRouter()
  const {mutate} = useMutation({
    mutationFn: (data: Update) => {
      return fetch(
        `/api/admin/competitions/${competitionId}/endCompetition`,
        {
          method: 'POST',
          body: JSON.stringify(data)
        }).then((res) => res.json())
    }
  })
  const onSubmit = (data: Update) => {
    mutate(data, {
      onSuccess: () => {
        router.refresh()
        onClose()
      }
    })
  }

  return (
    <Dialog
      open={!!competitionId || false}
      onOpenChange={(o) => o || onClose()}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="newYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competition End Year</FormLabel>
                  <FormControl>
                    <select 
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2050</option>
                    </select>
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}