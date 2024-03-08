'use client'

import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {Company} from "@/lib/schema/zod";

type Props = {
  editId?: string
  create?: boolean
  onClose: () => void
}

export const CompanyEditDialog = ({ editId, create, onClose }: Props) => {
  const form = useForm<Company>()
  const router = useRouter()
  const {mutate} = useMutation({
    mutationFn: (data: Company) => {
      return fetch(
        '/api/admin/companies',
        {
          method: 'POST',
          body: JSON.stringify(data)
        }).then((res) => res.json())
    }
  })
  const onSubmit = (data: Company) => {
    mutate(data, {
      onSuccess: () => {
        router.refresh()
        onClose()
      }
    })
  }

  return (
    <Dialog
      open={!!editId || create || false}
      onClose={onClose}
    >
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>カテゴリー名</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}