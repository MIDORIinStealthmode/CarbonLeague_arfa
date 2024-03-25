import {z} from "zod";
import {CompetitionEntrySchema, SuperpowerSchema} from "@/lib/schema/zod";

export const CompetitionEntryBodySchema = z.object({
  tokenIds: z.array(z.string()).length(3)
})

export type CompetitionEntryRequestBody = z.infer<typeof CompetitionEntryBodySchema>

// ユーザーのエントリー結果のスキーマ
export const UserEntrySchema = z.object({
  userId: z.string(),
  userAddress: z.string(),
  entries: CompetitionEntrySchema.extend({ superpower: SuperpowerSchema }).array(),
  totalScore: z.number()
})

export type UserEntry = z.infer<typeof UserEntrySchema>
