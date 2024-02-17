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
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// SUPERPOWER SCHEMA
/////////////////////////////////////////

export const SuperpowerSchema = z.object({
  id: z.string(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  categoryId: z.string(),
  companyId: z.string(),
})

export type Superpower = z.infer<typeof SuperpowerSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
}).strict()

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  superpowers: z.union([z.boolean(),z.lazy(() => SuperpowerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  superpowers: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  superpowers: z.union([z.boolean(),z.lazy(() => SuperpowerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  superpowers: z.union([z.boolean(),z.lazy(() => SuperpowerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  superpowers: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  superpowers: z.union([z.boolean(),z.lazy(() => SuperpowerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SUPERPOWER
//------------------------------------------------------

export const SuperpowerIncludeSchema: z.ZodType<Prisma.SuperpowerInclude> = z.object({
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

export const SuperpowerArgsSchema: z.ZodType<Prisma.SuperpowerDefaultArgs> = z.object({
  select: z.lazy(() => SuperpowerSelectSchema).optional(),
  include: z.lazy(() => SuperpowerIncludeSchema).optional(),
}).strict();

export const SuperpowerSelectSchema: z.ZodType<Prisma.SuperpowerSelect> = z.object({
  id: z.boolean().optional(),
  nftId: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  rank: z.boolean().optional(),
  score: z.boolean().optional(),
  year: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  companyId: z.boolean().optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  superpowers: z.lazy(() => SuperpowerListRelationFilterSchema).optional()
}).strict();

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  superpowers: z.lazy(() => SuperpowerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  superpowers: z.lazy(() => SuperpowerListRelationFilterSchema).optional()
}).strict());

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional()
}).strict();

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  superpowers: z.lazy(() => SuperpowerListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  superpowers: z.lazy(() => SuperpowerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  superpowers: z.lazy(() => SuperpowerListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SuperpowerWhereInputSchema: z.ZodType<Prisma.SuperpowerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SuperpowerWhereInputSchema),z.lazy(() => SuperpowerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SuperpowerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SuperpowerWhereInputSchema),z.lazy(() => SuperpowerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nftId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict();

export const SuperpowerOrderByWithRelationInputSchema: z.ZodType<Prisma.SuperpowerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nftId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional()
}).strict();

export const SuperpowerWhereUniqueInputSchema: z.ZodType<Prisma.SuperpowerWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SuperpowerWhereInputSchema),z.lazy(() => SuperpowerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SuperpowerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SuperpowerWhereInputSchema),z.lazy(() => SuperpowerWhereInputSchema).array() ]).optional(),
  nftId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict());

export const SuperpowerOrderByWithAggregationInputSchema: z.ZodType<Prisma.SuperpowerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nftId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SuperpowerCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SuperpowerAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SuperpowerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SuperpowerMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SuperpowerSumOrderByAggregateInputSchema).optional()
}).strict();

export const SuperpowerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SuperpowerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SuperpowerScalarWhereWithAggregatesInputSchema),z.lazy(() => SuperpowerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SuperpowerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SuperpowerScalarWhereWithAggregatesInputSchema),z.lazy(() => SuperpowerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nftId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  score: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  superpowers: z.lazy(() => SuperpowerCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  superpowers: z.lazy(() => SuperpowerUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  superpowers: z.lazy(() => SuperpowerUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  superpowers: z.lazy(() => SuperpowerUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  superpowers: z.lazy(() => SuperpowerCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  superpowers: z.lazy(() => SuperpowerUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  superpowers: z.lazy(() => SuperpowerUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  superpowers: z.lazy(() => SuperpowerUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerCreateInputSchema: z.ZodType<Prisma.SuperpowerCreateInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutSuperpowersInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSuperpowersInputSchema)
}).strict();

export const SuperpowerUncheckedCreateInputSchema: z.ZodType<Prisma.SuperpowerUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  categoryId: z.string(),
  companyId: z.string()
}).strict();

export const SuperpowerUpdateInputSchema: z.ZodType<Prisma.SuperpowerUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutSuperpowersNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSuperpowersNestedInputSchema).optional()
}).strict();

export const SuperpowerUncheckedUpdateInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerCreateManyInputSchema: z.ZodType<Prisma.SuperpowerCreateManyInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  categoryId: z.string(),
  companyId: z.string()
}).strict();

export const SuperpowerUpdateManyMutationInputSchema: z.ZodType<Prisma.SuperpowerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const SuperpowerListRelationFilterSchema: z.ZodType<Prisma.SuperpowerListRelationFilter> = z.object({
  every: z.lazy(() => SuperpowerWhereInputSchema).optional(),
  some: z.lazy(() => SuperpowerWhereInputSchema).optional(),
  none: z.lazy(() => SuperpowerWhereInputSchema).optional()
}).strict();

export const SuperpowerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SuperpowerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const CategoryRelationFilterSchema: z.ZodType<Prisma.CategoryRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CompanyRelationFilterSchema: z.ZodType<Prisma.CompanyRelationFilter> = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const SuperpowerCountOrderByAggregateInputSchema: z.ZodType<Prisma.SuperpowerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nftId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SuperpowerAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SuperpowerAvgOrderByAggregateInput> = z.object({
  nftId: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SuperpowerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SuperpowerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nftId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SuperpowerMinOrderByAggregateInputSchema: z.ZodType<Prisma.SuperpowerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nftId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SuperpowerSumOrderByAggregateInputSchema: z.ZodType<Prisma.SuperpowerSumOrderByAggregateInput> = z.object({
  nftId: z.lazy(() => SortOrderSchema).optional(),
  rank: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const SuperpowerCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.SuperpowerUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SuperpowerScalarWhereInputSchema),z.lazy(() => SuperpowerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SuperpowerScalarWhereInputSchema),z.lazy(() => SuperpowerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.SuperpowerUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SuperpowerScalarWhereInputSchema),z.lazy(() => SuperpowerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SuperpowerUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema).array(),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => SuperpowerCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => SuperpowerUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SuperpowerCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SuperpowerWhereUniqueInputSchema),z.lazy(() => SuperpowerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => SuperpowerUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => SuperpowerUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SuperpowerScalarWhereInputSchema),z.lazy(() => SuperpowerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedOneWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutSuperpowersInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSuperpowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutSuperpowersInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutSuperpowersInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSuperpowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutSuperpowersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const CategoryUpdateOneRequiredWithoutSuperpowersNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutSuperpowersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSuperpowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutSuperpowersInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutSuperpowersInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutSuperpowersInputSchema),z.lazy(() => CategoryUpdateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutSuperpowersInputSchema) ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutSuperpowersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutSuperpowersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSuperpowersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutSuperpowersInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutSuperpowersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutSuperpowersInputSchema),z.lazy(() => CompanyUpdateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSuperpowersInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const SuperpowerCreateWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerCreateWithoutCompanyInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutSuperpowersInputSchema)
}).strict();

export const SuperpowerUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  categoryId: z.string()
}).strict();

export const SuperpowerCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => SuperpowerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const SuperpowerCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.SuperpowerCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SuperpowerCreateManyCompanyInputSchema),z.lazy(() => SuperpowerCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SuperpowerUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => SuperpowerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SuperpowerUpdateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const SuperpowerUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => SuperpowerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SuperpowerUpdateWithoutCompanyInputSchema),z.lazy(() => SuperpowerUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const SuperpowerUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => SuperpowerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SuperpowerUpdateManyMutationInputSchema),z.lazy(() => SuperpowerUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const SuperpowerScalarWhereInputSchema: z.ZodType<Prisma.SuperpowerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SuperpowerScalarWhereInputSchema),z.lazy(() => SuperpowerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SuperpowerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SuperpowerScalarWhereInputSchema),z.lazy(() => SuperpowerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  nftId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  rank: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  score: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SuperpowerCreateWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSuperpowersInputSchema)
}).strict();

export const SuperpowerUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  companyId: z.string()
}).strict();

export const SuperpowerCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => SuperpowerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const SuperpowerCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.SuperpowerCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SuperpowerCreateManyCategoryInputSchema),z.lazy(() => SuperpowerCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SuperpowerUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => SuperpowerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SuperpowerUpdateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => SuperpowerCreateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const SuperpowerUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => SuperpowerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SuperpowerUpdateWithoutCategoryInputSchema),z.lazy(() => SuperpowerUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const SuperpowerUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => SuperpowerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SuperpowerUpdateManyMutationInputSchema),z.lazy(() => SuperpowerUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const CategoryCreateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryCreateWithoutSuperpowersInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CategoryUncheckedCreateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutSuperpowersInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CategoryCreateOrConnectWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutSuperpowersInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSuperpowersInputSchema) ]),
}).strict();

export const CompanyCreateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutSuperpowersInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CompanyUncheckedCreateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutSuperpowersInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CompanyCreateOrConnectWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutSuperpowersInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSuperpowersInputSchema) ]),
}).strict();

export const CategoryUpsertWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutSuperpowersInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutSuperpowersInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutSuperpowersInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutSuperpowersInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutSuperpowersInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutSuperpowersInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutSuperpowersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutSuperpowersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUpsertWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutSuperpowersInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSuperpowersInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSuperpowersInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutSuperpowersInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutSuperpowersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSuperpowersInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutSuperpowersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUncheckedUpdateWithoutSuperpowersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutSuperpowersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerCreateManyCompanyInputSchema: z.ZodType<Prisma.SuperpowerCreateManyCompanyInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  categoryId: z.string()
}).strict();

export const SuperpowerUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutSuperpowersNestedInputSchema).optional()
}).strict();

export const SuperpowerUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerCreateManyCategoryInputSchema: z.ZodType<Prisma.SuperpowerCreateManyCategoryInput> = z.object({
  id: z.string().optional(),
  nftId: z.number(),
  imageUrl: z.string(),
  name: z.string(),
  description: z.string(),
  rank: z.number(),
  score: z.number(),
  year: z.number(),
  companyId: z.string()
}).strict();

export const SuperpowerUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSuperpowersNestedInputSchema).optional()
}).strict();

export const SuperpowerUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SuperpowerUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.SuperpowerUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nftId: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rank: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  score: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  year: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Omit<Prisma.UserFindFirstArgs, "select">> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.UserFindFirstOrThrowArgs, "select">> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Omit<Prisma.UserFindManyArgs, "select">> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Omit<Prisma.UserFindUniqueArgs, "select">> = z.object({
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.UserFindUniqueOrThrowArgs, "select">> = z.object({
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindFirstArgsSchema: z.ZodType<Omit<Prisma.CompanyFindFirstArgs, "select" | "include">> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.CompanyFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindManyArgsSchema: z.ZodType<Omit<Prisma.CompanyFindManyArgs, "select" | "include">> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(),CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(),
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyFindUniqueArgsSchema: z.ZodType<Omit<Prisma.CompanyFindUniqueArgs, "select" | "include">> = z.object({
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.CompanyFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Omit<Prisma.CategoryFindFirstArgs, "select" | "include">> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.CategoryFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Omit<Prisma.CategoryFindManyArgs, "select" | "include">> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Omit<Prisma.CategoryFindUniqueArgs, "select" | "include">> = z.object({
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.CategoryFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const SuperpowerFindFirstArgsSchema: z.ZodType<Omit<Prisma.SuperpowerFindFirstArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereInputSchema.optional(),
  orderBy: z.union([ SuperpowerOrderByWithRelationInputSchema.array(),SuperpowerOrderByWithRelationInputSchema ]).optional(),
  cursor: SuperpowerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SuperpowerScalarFieldEnumSchema,SuperpowerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SuperpowerFindFirstOrThrowArgsSchema: z.ZodType<Omit<Prisma.SuperpowerFindFirstOrThrowArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereInputSchema.optional(),
  orderBy: z.union([ SuperpowerOrderByWithRelationInputSchema.array(),SuperpowerOrderByWithRelationInputSchema ]).optional(),
  cursor: SuperpowerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SuperpowerScalarFieldEnumSchema,SuperpowerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SuperpowerFindManyArgsSchema: z.ZodType<Omit<Prisma.SuperpowerFindManyArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereInputSchema.optional(),
  orderBy: z.union([ SuperpowerOrderByWithRelationInputSchema.array(),SuperpowerOrderByWithRelationInputSchema ]).optional(),
  cursor: SuperpowerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SuperpowerScalarFieldEnumSchema,SuperpowerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SuperpowerAggregateArgsSchema: z.ZodType<Prisma.SuperpowerAggregateArgs> = z.object({
  where: SuperpowerWhereInputSchema.optional(),
  orderBy: z.union([ SuperpowerOrderByWithRelationInputSchema.array(),SuperpowerOrderByWithRelationInputSchema ]).optional(),
  cursor: SuperpowerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SuperpowerGroupByArgsSchema: z.ZodType<Prisma.SuperpowerGroupByArgs> = z.object({
  where: SuperpowerWhereInputSchema.optional(),
  orderBy: z.union([ SuperpowerOrderByWithAggregationInputSchema.array(),SuperpowerOrderByWithAggregationInputSchema ]).optional(),
  by: SuperpowerScalarFieldEnumSchema.array(),
  having: SuperpowerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SuperpowerFindUniqueArgsSchema: z.ZodType<Omit<Prisma.SuperpowerFindUniqueArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereUniqueInputSchema,
}).strict() ;

export const SuperpowerFindUniqueOrThrowArgsSchema: z.ZodType<Omit<Prisma.SuperpowerFindUniqueOrThrowArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Omit<Prisma.UserCreateArgs, "select">> = z.object({
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Omit<Prisma.UserUpsertArgs, "select">> = z.object({
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Omit<Prisma.UserDeleteArgs, "select">> = z.object({
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Omit<Prisma.UserUpdateArgs, "select">> = z.object({
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const CompanyCreateArgsSchema: z.ZodType<Omit<Prisma.CompanyCreateArgs, "select" | "include">> = z.object({
  data: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
}).strict() ;

export const CompanyUpsertArgsSchema: z.ZodType<Omit<Prisma.CompanyUpsertArgs, "select" | "include">> = z.object({
  where: CompanyWhereUniqueInputSchema,
  create: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
}).strict() ;

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema,CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyDeleteArgsSchema: z.ZodType<Omit<Prisma.CompanyDeleteArgs, "select" | "include">> = z.object({
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateArgsSchema: z.ZodType<Omit<Prisma.CompanyUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema,CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(),
}).strict() ;

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Omit<Prisma.CategoryCreateArgs, "select" | "include">> = z.object({
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Omit<Prisma.CategoryUpsertArgs, "select" | "include">> = z.object({
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Omit<Prisma.CategoryDeleteArgs, "select" | "include">> = z.object({
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Omit<Prisma.CategoryUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const SuperpowerCreateArgsSchema: z.ZodType<Omit<Prisma.SuperpowerCreateArgs, "select" | "include">> = z.object({
  data: z.union([ SuperpowerCreateInputSchema,SuperpowerUncheckedCreateInputSchema ]),
}).strict() ;

export const SuperpowerUpsertArgsSchema: z.ZodType<Omit<Prisma.SuperpowerUpsertArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereUniqueInputSchema,
  create: z.union([ SuperpowerCreateInputSchema,SuperpowerUncheckedCreateInputSchema ]),
  update: z.union([ SuperpowerUpdateInputSchema,SuperpowerUncheckedUpdateInputSchema ]),
}).strict() ;

export const SuperpowerCreateManyArgsSchema: z.ZodType<Prisma.SuperpowerCreateManyArgs> = z.object({
  data: z.union([ SuperpowerCreateManyInputSchema,SuperpowerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SuperpowerDeleteArgsSchema: z.ZodType<Omit<Prisma.SuperpowerDeleteArgs, "select" | "include">> = z.object({
  where: SuperpowerWhereUniqueInputSchema,
}).strict() ;

export const SuperpowerUpdateArgsSchema: z.ZodType<Omit<Prisma.SuperpowerUpdateArgs, "select" | "include">> = z.object({
  data: z.union([ SuperpowerUpdateInputSchema,SuperpowerUncheckedUpdateInputSchema ]),
  where: SuperpowerWhereUniqueInputSchema,
}).strict() ;

export const SuperpowerUpdateManyArgsSchema: z.ZodType<Prisma.SuperpowerUpdateManyArgs> = z.object({
  data: z.union([ SuperpowerUpdateManyMutationInputSchema,SuperpowerUncheckedUpdateManyInputSchema ]),
  where: SuperpowerWhereInputSchema.optional(),
}).strict() ;

export const SuperpowerDeleteManyArgsSchema: z.ZodType<Prisma.SuperpowerDeleteManyArgs> = z.object({
  where: SuperpowerWhereInputSchema.optional(),
}).strict() ;