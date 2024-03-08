'use client'

import {Category} from "@/lib/schema/zod";
import {CategoryTable} from "@/app/admin/categories/CategoryTable";
import {CategoryEditDialog} from "@/app/admin/categories/CategoryEditDialog";
import {useState} from "react";
import {Button} from "@/components/ui/button";

type Props = {
  categories: Category[]
}

export const CategoryList = (props: Props) => {
  const [editId, setEditId] = useState<string>()
  const [create, setCreate] = useState(false)

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between align-center">
        <h1>カテゴリ一覧</h1>
        <Button onClick={() => setCreate(true)}>Create</Button>
      </div>

      <CategoryTable categories={props.categories} />
      <CategoryEditDialog
        onClose={() => {
          setEditId(undefined)
          setCreate(false)
        }}
        editId={editId}
        create={create}
      />
    </div>
  )
}
