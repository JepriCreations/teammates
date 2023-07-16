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
    <div className="container fixed inset-x-0 top-0 z-40">
      <header className="width-before-scroll-bar relative bg-background py-3">
        <nav className="flex items-center gap-3">
          {/* Visible only in small devices ----*/}
          <div className="mr-3 sm:hidden">
            <NavMenuButton mainMenu={menuItems} />
          </div>
          {/*---- Visible only in small devices */}

          <Link href={routes.HOME} className="mr-6">
            <Logo height={24} />
          </Link>

          <ul className="hidden grow gap-6 font-medium sm:flex">
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

          <div className="ml-auto flex items-center gap-6">
            <ModeToggle />
            {session ? (
              <Button asChild>
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
