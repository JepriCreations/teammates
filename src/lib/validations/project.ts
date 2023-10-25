import * as z from 'zod'

import { linkObjectSchema } from './global'

export const SUMMARY_MAX_LENGTH = 85
export const MAX_CATEGORIES = 2
export const MAX_FILE_SIZE = 250 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
]

const locationSchema = z.object({
  country: z.string().nonempty(),
  city: z
    .string()
    .min(3, {
      message: 'At least 3 characters.',
    })
    .max(25, { message: 'That is too long. Make it less than 25 characters.' }),
})

export const fileSchema = z
  .any()
  .refine((file) => file, { message: 'An icon is required.' })
  .refine((file) => file && file?.size <= MAX_FILE_SIZE, {
    message: 'File size must be less than or equal to 500kb',
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
    message: 'The accepted files are .png .jpg .jpeg .webp"',
  })

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Project name must be at least 2 characters.',
    })
    .max(32, { message: 'That is too long for a project name.' }),
  summary: z
    .string()
    .min(15, { message: "The summary doesn't seems long enough." })
    .max(SUMMARY_MAX_LENGTH, { message: 'That is too long for one line.' }),
  categories: z
    .string()
    .array()
    .min(1, { message: 'Select at least 1 category.' })
    .max(MAX_CATEGORIES),
  description: z.string().min(1, {
    message: 'This value is required.',
  }),
  location: locationSchema,
  links: z.array(linkObjectSchema),
  icon_url: z.string().url().optional(),
  public: z.boolean().default(false).optional(),
})

export const createProjectSchema = projectSchema.merge(
  z.object({ file: fileSchema })
)
export const updateProjectSchema = projectSchema
  .merge(z.object({ file: fileSchema.optional() }))
  .partial()
