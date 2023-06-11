import * as z from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const contactSquema = z.object({
  email: z.string().email(),
  twitter: z.string().url(),
  linkedin: z.string().url(),
})

const locationSquema = z.object({
  country: z.string(),
  city: z.string(),
})

export const projectSquema = z.object({
  name: z.string().min(3).max(32),
  summary: z.string().min(10).max(100),
  categories: z.string().array().max(2),
  icon: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
  description: z.string(),
  contact: contactSquema.partial().required({ email: true }),
  public: z.boolean(),
  location: locationSquema,
})
