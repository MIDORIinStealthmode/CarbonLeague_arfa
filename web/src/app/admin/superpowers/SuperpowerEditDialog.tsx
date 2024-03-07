'use client'

import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {SubmitHandler, useForm} from "react-hook-form";
import {Superpower, SuperpowerSchema} from "@/lib/schema/zod";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useMemo } from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useUploadImage} from "@/app/admin/superpowers/useUploadImage";
import z from 'zod'
import {useRouter} from "next/navigation";

type Props = {
  editId?: string
  create?: boolean
  onClose: () => void
}

export const SuperpowerEditDialog = ({ editId, create, onClose }: Props) => {
  const router = useRouter()

  const form = useForm<Superpower>({
    resolver: zodResolver(SuperpowerSchema.extend({
      id: create ? z.string().optional() : z.string(),
      nftId: z.preprocess(v => Number(v), z.number().int()),
      rank: z.preprocess(v => Number(v), z.number().int()),
      score: z.preprocess(v => Number(v), z.number().int()),
      year: z.preprocess(v => Number(v), z.number().int())
    })),
  })
  const { setValue } = form

  const { data: superpower } = useQuery<Superpower>({
    queryKey: ['superpowers', editId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/superpowers/${editId}`);
      const data = await res.json();
      form.reset(data);
      return data;
    },
    enabled: !!editId
  })

  const { upload } = useUploadImage('superpowerImages')
  const handleUploadImage = async (file: File) => {
    const url = await upload(file)
    setValue('imageUrl', url)
  }

  const { mutate } = useMutation({
    mutationFn: async (data: Superpower) => {
      const res = await fetch(
        create ? '/api/admin/superpowers' : `/api/admin/superpowers/${editId}`,
        {
          method: create ? 'POST' : 'PUT',
          body: JSON.stringify(data)
        }
      )
      return res.json()
    }
  })
  const onSubmit: SubmitHandler<Superpower> = (data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset()
        onClose()
        router.refresh()
      }
    })
  }

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch('/api/admin/categories').then((res) => res.json())
  })
  const categories = useMemo<{ label: string, value: string }[]>(() => (categoriesData || []).map((category: any) => ({
    label: category.name,
    value: category.id
  })), [categoriesData])

  const { data: companiesData } = useQuery({
    queryKey: ['companies'],
    queryFn: () => fetch('/api/admin/companies').then((res) => res.json())
  })
  const companies = useMemo<{ label: string, value: string }[]>(() => (companiesData || []).map((company: any) => ({
    label: company.name,
    value: company.id
  })), [companiesData])

  return (
    <Dialog
      open={!!editId || create}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-xl w-full">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Superpower</DialogTitle>
          </DialogHeader>
          <Form<Superpower> {...form}>
            <div className="grid grid-cols-3 gap-4">
              <FormField<Superpower>
                control={form.control}
                name="nftId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>tokenId</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="tokenId" {...field} />
                    </FormControl>
                    <FormDescription>This is same as tokenId.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? companies.find((company) => company.value === field.value)?.label : "Select Company"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Company..." />
                          <CommandEmpty>No Company found.</CommandEmpty>
                          <CommandGroup>
                            {companies.map((company) => (
                              <CommandItem
                                value={company.label}
                                key={company.value}
                                onSelect={() => field.onChange(company.value)}
                              >
                                <Check className={cn("mr-2 h-4 w-4", company.value === field.value ? "opacity-100" : "opacity-0")}
                                />
                                {company.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      NFT company
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="year" {...field} />
                    </FormControl>
                    <FormDescription>NFT year</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="NFT name" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>
                    <FormDescription>NFT description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="image" {...field} rightElement={
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="nft-image-upload"
                            onChange={(e) => {
                              e.preventDefault()
                              const file = e.target.files && e.target.files[0]
                              if (file) {
                                handleUploadImage(file).then(() => e.target.value = '')
                              }
                            }}
                          />
                          <Button asChild>
                            <label htmlFor="nft-image-upload">
                              Upload
                            </label>
                          </Button>
                        </div>
                      }/>
                    </FormControl>
                    <FormDescription>NFT Image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.watch('imageUrl') as string}
                alt="NFT Image"
                className="max-h-40 row-span-2"
              />
              <FormField<Superpower>
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>rank</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="rank" {...field} />
                    </FormControl>
                    <FormDescription>NFT rank</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>score</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="score" {...field} />
                    </FormControl>
                    <FormDescription>NFT score</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField<Superpower>
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? categories.find((category) => category.value === field.value)?.label : "Select Category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Category..." />
                          <CommandEmpty>No Category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => field.onChange(category.value)}
                              >
                                <Check className={cn("mr-2 h-4 w-4", category.value === field.value ? "opacity-100" : "opacity-0")}
                                />
                                {category.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      NFT category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
