import * as z from 'zod'

import { linkObjectSchema } from './global'

export const ABOUT_MAX_LENGTH = 1000

const optionalEmail = z
  .union([z.string().length(0), z.string().email()])
  .optional()
  .transform((e) => (e === '' ? undefined : e))

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Your name should be at least 3 characters' })
    .max(32, { message: 'That is too long for a name' }),
  about: z.string().min(0).max(ABOUT_MAX_LENGTH),
  links: z.array(linkObjectSchema),
  nationality: z.string(),
  email: optionalEmail,
})
