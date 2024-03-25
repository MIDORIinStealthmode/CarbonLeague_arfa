'use client'

import {Competition} from "@/lib/schema/zod";
import {Button} from "@/components/ui/button";
import {CompetitionTable} from "@/app/admin/competitions/CompetitionTable";
import {useState} from "react";
import {CompetitionEditDialog} from "@/app/admin/competitions/CompetitionEditDialog";
import {CompetitionRewardEditDialog} from "@/app/admin/competitions/CompetitionRewardEditDialog";

type Props = {
  competitions: Competition[]
}

export const CompetitionList = (props: Props) => {
  const [editId, setEditId] = useState<string>()
  const [editRewardId, setEditRewardId] = useState<string>()
  const [create, setCreate] = useState<boolean>(false)

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between align-center">
        <h1>Competition一覧</h1>
        <Button onClick={() => setCreate(true)}>新規作成</Button>
      </div>

      <CompetitionTable
        competitions={props.competitions}
        onEdit={(id) => setEditId(id)}
        onEditReward={(id) => setEditRewardId(id)}
      />

      <CompetitionEditDialog
        editId={editId}
        create={create}
        onClose={() => {
          setEditId(undefined)
          setEditRewardId(undefined)
          setCreate(false)
        }}
      />
      <CompetitionRewardEditDialog
        editId={editRewardId}
        onClose={() => {
          setEditId(undefined)
          setEditRewardId(undefined)
          setCreate(false)
        }}
      />
    </div>
  )
}
