'use client'

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SubmitHandler, useForm} from "react-hook-form";
import {CompetitinStatusSchema, Competition, CompetitionSchema} from "@/lib/schema/zod";
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {useMutation, useQuery} from "@tanstack/react-query";
import z from 'zod'
import {useRouter} from "next/navigation";

type Props = {
  editId?: string
  create?: boolean
  onClose: () => void
}

const CompetitionEditSchema = CompetitionSchema.extend({
  id: z.string().optional(),
  year: z.preprocess(v => Number(v), z.number().int()),
  startDate: z.string(),
  endDate: z.string(),
})
type CompetitionEdit = z.infer<typeof CompetitionEditSchema>

export const CompetitionEditDialog = ({ editId, create, onClose }: Props) => {
  const router = useRouter()

  const form = useForm<CompetitionEdit>({
    resolver: zodResolver(CompetitionEditSchema),
    defaultValues: {
      name: '',
      year: new Date().getFullYear(),
      status: 'UPCOMING',
      startDate: '',
      endDate: '',
    }
  })
  const { setValue } = form

  useQuery<Competition>({
    queryKey: ['competitions', editId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/competitions/${editId}`);
      const data = await res.json();
      form.reset(data);
      return data;
    },
    enabled: !!editId
  })

  const { mutate } = useMutation({
    mutationFn: async (data: CompetitionEdit) => {
      const res = await fetch(
        create ? '/api/admin/competitions' : `/api/admin/competitions/${editId}`,
        {
          method: create ? 'POST' : 'PUT',
          body: JSON.stringify(data)
        }
      )
      return res.json()
    }
  })
  const onSubmit: SubmitHandler<CompetitionEdit> = (data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        onClose()
        router.refresh()
      }
    })
  }

  return (
    <Dialog
      open={!!editId || create || false}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-xl w-full">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Competition</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <div className="grid grid-cols-3 gap-4">
              <FormField<CompetitionEdit, 'name'>
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="Competition name" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<CompetitionEdit, 'year'>
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="year"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>完了時にこのyearにNFTのyearを更新します</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<CompetitionEdit, 'status'>
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>status</FormLabel>
                    <FormControl>
                      <select {...field} className="bg-white block w-full rounded-md border px-3 py-2">
                        {CompetitinStatusSchema.options.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<CompetitionEdit, 'startDate'>
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="startDate" {...field} />
                    </FormControl>
                    <FormDescription>開始時刻になるとUPCOMINGからOPENに変更されます</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<CompetitionEdit, 'endDate'>
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="endDate" {...field} />
                    </FormControl>
                    <FormDescription>開始時刻になるとOPENからCLOSEDに変更されます</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!form.formState.isValid}>Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
