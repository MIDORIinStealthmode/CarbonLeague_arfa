import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name']);

export const SuperpowerScalarFieldEnumSchema = z.enum(['id','nftId','imageUrl','name','description','rank','score','year','categoryId','companyId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
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
  nftId: z.number().int(),
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
