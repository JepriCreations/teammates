import { ROUTES } from '@/constants/routes'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Teammates',
  description:
    'Unlock the Power of Collaboration and Connect with Your Dream Team!',
  mainNav: [
    {
      title: 'Teammates',
      href: '/',
    },
  ],
  links: {
    website: 'teammates.mov',
    github: ROUTES.GITHUB,
  },
}
