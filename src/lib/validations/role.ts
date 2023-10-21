import * as z from 'zod'

import {
  ExperienceLevel,
  Rewards,
  Roles,
  RoleStatus,
  WorkMode,
} from '@/types/collections'

export const roleSchema = z.object({
  name: z.nativeEnum(Roles),
  exp_level: z.nativeEnum(ExperienceLevel),
  rewards: z
    .array(z.nativeEnum(Rewards))
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one reward.',
    }),
  description: z
    .string()
    .min(15, { message: 'Explain with more details the role position.' }),
  work_mode: z.nativeEnum(WorkMode),
})
export const rolesInsertSchema = z.object({
  project_id: z.string().uuid(),
})

export const updateRoleStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.nativeEnum(RoleStatus),
})

export const rolesSchema = z.array(roleSchema.merge(rolesInsertSchema))
