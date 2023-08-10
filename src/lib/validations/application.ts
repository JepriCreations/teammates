import * as z from 'zod'

import { ApplicationStatus } from '@/types/collections'

export const applicationSchema = z.object({
  project_id: z.string().uuid(),
  status: z
    .nativeEnum(ApplicationStatus)
    .default(ApplicationStatus.StandBy)
    .optional(),
  role_id: z.string().uuid(),
})