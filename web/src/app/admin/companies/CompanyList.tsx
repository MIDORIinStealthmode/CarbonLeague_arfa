'use client'

import {CompanyTable} from "@/app/admin/companies/CompanyTable";
import {Company} from "@/lib/schema/zod";
import {CompanyEditDialog} from "@/app/admin/companies/CompanyEditDialog";
import {useState} from "react";
import {Button} from "@/components/ui/button";

type Props = {
  companies: Company[]
}

export const CompanyList = (props: Props) => {
  const [editId, setEditId] = useState<string>()
  const [create, setCreate] = useState(false)

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between items-center">
        <h1>会社一覧</h1>
        <Button onClick={() => setCreate(true)}>Create</Button>
      </div>

      <CompanyTable companies={props.companies} />
      <CompanyEditDialog
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