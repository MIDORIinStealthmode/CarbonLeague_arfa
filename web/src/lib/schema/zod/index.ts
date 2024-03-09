import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','address']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name']);

export const SuperpowerScalarFieldEnumSchema = z.enum(['id','tokenId','imageUrl','name','description','rank','score','year','categoryId','companyId']);

export const CarbonEmissionScalarFieldEnumSchema = z.enum(['id','year','companyId','scope1','scope2','scope3','revenue','revenueUnit']);

export const ScoreReportScalarFieldEnumSchema = z.enum(['id','carbonEmissionId','scoreCO2Reduction','scoreCarbonEfficiency','totalScore']);

export const CompetitionScalarFieldEnumSchema = z.enum(['id','name','startDate','endDate','status']);

export const CompetitionEntryScalarFieldEnumSchema = z.enum(['id','competitionId','userId','superpowerId','order']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const CompetitinStatusSchema = z.enum(['UPCOMING','OPEN','CLOSED','FINISHED']);

export type CompetitinStatusType = `${z.infer<typeof CompetitinStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  address: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// SUPERPOWER SCHEMA
/////////////////////////////////////////

export const SuperpowerSchema = z.object({
  id: z.string().uuid(),
  tokenId: z.number().int().nullable(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number().int(),
  score: z.number().int(),
  year: z.number().int(),
  categoryId: z.string(),
  companyId: z.string(),
})

export type Superpower = z.infer<typeof SuperpowerSchema>

/////////////////////////////////////////
// CARBON EMISSION SCHEMA
/////////////////////////////////////////

export const CarbonEmissionSchema = z.object({
  id: z.string().uuid(),
  year: z.number().int(),
  companyId: z.string(),
  scope1: z.number().nullable(),
  scope2: z.number().nullable(),
  scope3: z.number().nullable(),
  revenue: z.number().nullable(),
  revenueUnit: z.string().nullable(),
})

export type CarbonEmission = z.infer<typeof CarbonEmissionSchema>

/////////////////////////////////////////
// SCORE REPORT SCHEMA
/////////////////////////////////////////

export const ScoreReportSchema = z.object({
  id: z.string().uuid(),
  carbonEmissionId: z.string(),
  scoreCO2Reduction: z.number().nullable(),
  scoreCarbonEfficiency: z.number(),
  totalScore: z.number().nullable(),
})

export type ScoreReport = z.infer<typeof ScoreReportSchema>

/////////////////////////////////////////
// COMPETITION SCHEMA
/////////////////////////////////////////

export const CompetitionSchema = z.object({
  status: CompetitinStatusSchema,
  id: z.string().uuid(),
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export type Competition = z.infer<typeof CompetitionSchema>

/////////////////////////////////////////
// COMPETITION ENTRY SCHEMA
/////////////////////////////////////////

export const CompetitionEntrySchema = z.object({
  id: z.string().uuid(),
  competitionId: z.string(),
  userId: z.string(),
  superpowerId: z.string(),
  order: z.number().int(),
})

export type CompetitionEntry = z.infer<typeof CompetitionEntrySchema>
