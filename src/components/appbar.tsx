import Link from 'next/link'
import { routes } from '@/constants/routes'
import { Session } from '@supabase/supabase-js'

import { Translator } from '@/lib/dictionaries'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { NavLink } from '@/components/nav-link'
import { NavMenuButton } from '@/components/nav-menu-button'

const menu = [
  {
    id: 'discover',
    slug: routes.HOME,
  },
  {
    id: 'blog',
    slug: routes.BLOG,
  },
  {
    id: 'about',
    slug: routes.ABOUT,
  },
]

interface AppbarProps {
  t: Translator
  session: Session | null
}

export const Appbar = ({ t, session }: AppbarProps) => {
  const menuItems = menu.map((item) => ({ ...item, title: t(item.id) }))

  return (
    <div className="fixed inset-x-0 top-0 z-40 px-3 sm:container">
      <header className="width-before-scroll-bar relative bg-surface py-3">
        <nav className="flex items-center gap-3 sm:justify-between">
          {/* Visible only in small devices ----*/}
          <div className="mr-3 sm:hidden">
            <NavMenuButton mainMenu={menuItems} />
          </div>
          {/*---- Visible only in small devices */}

          <ul className="hidden gap-6 font-medium sm:mr-6 sm:flex">
            {menuItems.map(({ id, title, slug }) => (
              <li key={id}>
                <NavLink
                  href={slug}
                  className="animate-in fade-in-50 slide-in-from-left"
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="top-0 flex h-full w-fit items-center justify-center sm:absolute sm:inset-x-0 sm:mx-auto">
            <Link
              href={routes.HOME}
              className="transition-opacity hover:opacity-70 "
            >
              <Logo height={24} />
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-6 sm:ml-0">
            <div className="hidden sm:block">
              <ModeToggle />
            </div>
            {session ? (
              <Button asChild className="min-w-0">
                <Link href={routes.PROJECTS}>{t('dashboard')}</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={routes.LOGIN}>{t('login')}</Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
    </div>
  )
}
