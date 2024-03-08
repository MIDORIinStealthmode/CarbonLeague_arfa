'use client'

import {Category, Company, Superpower} from "@/lib/schema/zod";
import {Button} from "@/components/ui/button";
import {SuperpowerEditDialog} from "@/app/admin/superpowers/SuperpowerEditDialog";
import {useState} from "react";
import {SuperpowerTable} from "@/app/admin/superpowers/SuperpowerTable";

type Props = {
  superpowers: (Superpower & { company: Company, category: Category })[]
}

export const SuperpowerList = (props: Props) => {
  const [editId, setEditId] = useState<string>()
  const [create, setCreate] = useState(false)

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between items-center">
        <h1>Superpower一覧</h1>
        <Button onClick={() => setCreate(true)}>新規作成</Button>
      </div>

      <SuperpowerTable
        superpowers={props.superpowers}
        onEdit={(id) => setEditId(id)}
      />

      <SuperpowerEditDialog
        editId={editId}
        create={create}
        onClose={() => {
          setEditId(undefined)
          setCreate(false)
        }}
      />
    </div>
  )
}
