import { Icons } from '@/components/icons'

export const linksIcons = {
  twitter: Icons.twitter,
  linkedin: Icons.linkedin,
  instagram: Icons.instagram,
  website: Icons.website,
  email: Icons.email,
} as const

export type LinksIconsType = keyof typeof linksIcons
