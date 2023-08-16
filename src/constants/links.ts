import {
  EmailIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  WebsiteIcon,
} from '@/components/icons'

export const linksIcons = {
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  website: WebsiteIcon,
  email: EmailIcon,
} as const

export type LinksIconsType = keyof typeof linksIcons
