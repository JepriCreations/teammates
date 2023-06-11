import * as z from 'zod'

export const profileSquema = z.object({
  name: z.string().min(3).max(32),
  about: z.string(),
  links: z.string().url().array().max(5),
})
