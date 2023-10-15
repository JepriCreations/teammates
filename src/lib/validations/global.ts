import * as z from 'zod'

import { Icons } from '@/components/icons'

export const SOCIALS = [
  {
    name: 'twitter',
    icon: Icons.twitter,
    url: 'https://twitter.com/',
  },
  {
    name: 'linkedin',
    icon: Icons.linkedin,
    url: 'https://linkedin.com/',
  },
  {
    name: 'instagram',
    icon: Icons.instagram,
    url: 'https://instagram.com/',
  },
  {
    name: 'website',
    icon: Icons.website,
    url: 'https://',
  },
]

const linkPrefixes: Record<string, string> = SOCIALS.reduce(
  (acc: Record<string, string>, curr) => {
    const { name, url } = curr
    acc[name] = url
    return acc
  },
  {}
)

export const defaultSocialLinks = SOCIALS.map((s) => ({
  name: s.name,
  url: '',
}))

export const linkObjectSchema = z
  .object({
    name: z.string(),
    url: z.string().optional(),
  })
  .refine(
    (value) => {
      const { name, url } = value
      if (!url || name === 'email') return true
      const prefix = linkPrefixes[name]
      return prefix && url?.startsWith(prefix)
    },
    (value) => ({
      message: `The link have to starts with "${linkPrefixes[value.name]}"`,
    })
  )
