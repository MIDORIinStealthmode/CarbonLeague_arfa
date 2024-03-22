import {z} from "zod";

export const CompetitionEntryBodySchema = z.object({
  tokenIds: z.array(z.string()).length(3)
})

export type CompetitionEntryRequestBody = z.infer<typeof CompetitionEntryBodySchema>
