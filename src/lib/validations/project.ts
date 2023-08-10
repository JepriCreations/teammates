import * as z from 'zod'

import {
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  WebsiteIcon,
} from '@/components/icons'

export const SUMMARY_MAX_LENGTH = 85
export const MAX_CATEGORIES = 2
const MAX_FILE_SIZE = 500 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp',
]

export const socials = [
  {
    name: 'twitter',
    icon: TwitterIcon,
    link: 'https://twitter.com/',
  },
  {
    name: 'linkedin',
    icon: LinkedinIcon,
    link: 'https://linkedin.com/',
  },
  {
    name: 'instagram',
    icon: InstagramIcon,
    link: 'https://instagram.com/',
  },
  // {
  //   name: 'mastodon',
  //   icon: MastodonOutlineIcon,
  //   link: 'https://mastodon.',
  // },
  {
    name: 'website',
    icon: WebsiteIcon,
    link: 'https://',
  },
]

const linkPrefixes: Record<string, string> = socials.reduce(
  (acc: Record<string, string>, curr) => {
    const { name, link } = curr
    acc[name] = link
    return acc
  },
  {}
)

const linkObjectSchema = z
  .object({
    name: z.string(),
    link: z.string().optional(),
  })
  .refine(
    (value) => {
      const { name, link } = value
      if (!link) return true
      const prefix = linkPrefixes[name]
      return prefix && link?.startsWith(prefix)
    },
    (value) => ({
      message: `The link have to starts with "${linkPrefixes[value.name]}"`,
    })
  )

const locationSchema = z.object({
  country: z
    .string()
    .min(1, {
      message: 'This value is required.',
    })
    .max(15, { message: 'That is too long. Make it less than 15 characters.' }),
  city: z
    .string()
    .min(3, {
      message: 'At least 3 characters.',
    })
    .max(25, { message: 'That is too long. Make it less than 15 characters.' }),
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
export const updateProjectSchema = createProjectSchema.partial()
