'use client'

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {
  CompetitinStatusSchema,
  Competition,
  CompetitionReward,
  CompetitionRewardSchema,
  CompetitionSchema, Superpower
} from "@/lib/schema/zod";
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {useMutation, useQuery} from "@tanstack/react-query";
import z from 'zod'
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {useMemo} from "react";
import {cn} from "@/lib/utils";

type Props = {
  editId?: string
  create?: boolean
  onClose: () => void
}

const FormSchema = z.object({
  rewards: z.array(CompetitionRewardSchema.extend({
    id: z.string().optional(),
    competitionId: z.string().optional(),
    rank: z.preprocess((val) => Number(val), z.number()),
    rewardAmount: z.preprocess((val) => Number(val), z.number()).optional(),
  }))
})
type FormType = z.infer<typeof FormSchema>

export const CompetitionRewardEditDialog = ({ editId, create, onClose }: Props) => {
  const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {rewards: []}
  })
  const array = useFieldArray({control: form.control, name: 'rewards'})

  useQuery({
    queryKey: ['competitions', editId, 'rewards'],
    queryFn: async () => {
      const res = await fetch(`/api/admin/competitions/${editId}/rewards`);
      const data = await res.json();
      form.reset(data);
      return data;
    },
    enabled: !!editId
  })

  const { mutate } = useMutation({
    mutationFn: async (data: FormType) => {
      const res = await fetch(
        `/api/admin/competitions/${editId}/rewards`,
        {
          method: 'PATCH',
          body: JSON.stringify(data)
        }
      )
      return res.json()
    }
  })
  const onSubmit: SubmitHandler<FormType> = (data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        onClose()
        router.refresh()
      }
    })
  }

  const { data: superpowerData } = useQuery({
    queryKey: ['superpowers'],
    queryFn: () => fetch('/api/admin/superpowers').then((res) => res.json())
  })
  const superpowers = useMemo<{ label: string, value: string }[]>(
    () => (superpowerData || [])
      .filter((superpower: Superpower) => superpower.tokenId === null)
      .map((superpower: Superpower) => ({
        label: superpower.name,
        value: superpower.id
      })),
    [superpowerData]
  )

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
            <div className="py-4">
              {array.fields.map((field, index) => (
                <div key={index} className="flex gap-1">
                  <FormField
                    control={form.control}
                    name={`rewards.${index}.rank`}
                    render={({ field }) => (
                      <FormItem className="w-20">
                        <FormLabel>Rank</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Rank" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`rewards.${index}.rewardAmount`}
                    render={({ field }) => (
                      <FormItem className="w-20">
                        <FormLabel>ETH</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Rank" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`rewards.${index}.superpowerId`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Superpower</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? superpowers.find((superpower) => superpower.value === field.value)?.label : "Select Superpower"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search Superpower..." />
                              <CommandEmpty>No Superpower found.</CommandEmpty>
                              <CommandGroup>
                                {superpowers.map((superpower) => (
                                  <CommandItem
                                    value={superpower.label}
                                    key={superpower.value}
                                    onSelect={() => field.onChange(superpower.value)}
                                  >
                                    <Check className={cn("mr-2 h-4 w-4", superpower.value === field.value ? "opacity-100" : "opacity-0")}/>
                                    {superpower.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button onClick={() => array.remove(index)} variant="ghost">x</Button>
                </div>
              ))}
              <div className="w-full flex justify-end">
                <Button onClick={() => array.append({ rank: 1, rewardAmount: 0, superpowerId: '' })}>+</Button>
              </div>
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
