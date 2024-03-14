import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { createServerClient } from '@/lib/supabase-server'
import { Appbar } from '@/components/appbar'

interface SiteLayoutProps {
  params: { locale: string }
  children: React.ReactNode
}

export default async function SiteLayout({
  children,
  params: { locale },
}: SiteLayoutProps) {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { t } = await getDictionary(locale)

  const footerNavItems = [
    {
      title: t('Menus.blog'),
      href: ROUTES.BLOG,
    },
    {
      title: t('Menus.about'),
      href: ROUTES.ABOUT,
    },
  ]

  if (session) {
    const sessionItems = [
      {
        title: t('Menus.projects'),
        href: ROUTES.PROJECTS,
      },
      {
        title: t('Menus.profile'),
        href: ROUTES.PROFILE,
      },
    ]
    footerNavItems.push(...sessionItems)
  }

  return (
    <>
      <Appbar t={t} loggedIn={Boolean(session)} />
      <main className="min-h-[calc(100dvh-80px)] pb-6 pt-24 md:container">
        {children}
      </main>
      <footer className="flex items-center justify-center px-6 py-4 md:container sm:justify-between">
        <a
          href="https://teammates.buildbuddy.one"
          className="block text-onSurface opacity-50 transition-opacity hover:opacity-100"
        >
          teammates.buildbuddy.one
        </a>
        <nav className="hidden sm:block">
          <ul className="flex gap-4">
            {footerNavItems.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="block text-onSurface opacity-50 transition-opacity hover:opacity-100"
                >
                  {title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/JepriCreations/teammates"
                className="block text-onSurface opacity-50 transition-opacity hover:opacity-100"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}
