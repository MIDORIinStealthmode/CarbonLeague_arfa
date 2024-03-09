'use client'

import {Competition} from "@/lib/schema/zod";
import {Button} from "@/components/ui/button";
import {CompetitionTable} from "@/app/admin/competition/CompetitionTable";
import {useState} from "react";
import {EndCompetition} from "@/app/admin/competition/endCompetition";

type Props = {
  competitions: Competition[]
}

export const CompetitionList = (props: Props) => {
  const [competitionId, setcompetitionId] = useState<string>()

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between align-center">
        <h1>Competition一覧</h1>
      </div>

      <CompetitionTable
        competitions={props.competitions}
        onEdit={(id) => setcompetitionId(id)}
      />

      <EndCompetition
        competitionId={competitionId}
        onClose={() => {
          setcompetitionId(undefined)
        }}
      />
    </div>
  )
}
