import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { Translator } from '@/lib/dictionaries'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { NavLink } from '@/components/nav-link'
import { NavMenuButton } from '@/components/nav-menu-button'

const menu = [
  {
    id: 'discover',
    slug: ROUTES.HOME,
  },
  {
    id: 'blog',
    slug: ROUTES.BLOG,
  },
  {
    id: 'about',
    slug: ROUTES.ABOUT,
  },
]

interface AppbarProps {
  t: Translator
  loggedIn: boolean
}

export const Appbar = ({ t, loggedIn }: AppbarProps) => {
  const menuItems = menu.map((item) => ({
    ...item,
    title: t(`Menus.${item.id}`),
  }))

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 sm:container">
        <header className="width-before-scroll-bar relative bg-surface px-3 py-3">
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

            <div className="top-0 flex h-full w-fit items-center justify-center gap-1 sm:absolute sm:inset-x-0 sm:mx-auto">
              <Link
                href={ROUTES.HOME}
                className="transition-opacity hover:opacity-70"
              >
                <Logo className="h-6" />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-6 sm:ml-0">
              <div className="hidden sm:block">
                <ModeToggle />
              </div>
              {loggedIn ? (
                <Button
                  variant="brutalist"
                  className="min-w-0 px-4 sm:min-w-[100px] sm:px-6"
                  asChild
                >
                  <Link href={ROUTES.PROJECTS}>
                    <span className="sm:hidden">
                      <Icons.dashboard />
                    </span>
                    <span className="hidden sm:inline">
                      {t('Menus.dashboard')}
                    </span>
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="brutalist"
                  className="min-w-0 px-4 sm:min-w-[100px] sm:px-6"
                  asChild
                >
                  <Link href={ROUTES.LOGIN}>
                    <span className="sm:hidden">
                      <Icons.account />
                    </span>
                    <span className="hidden sm:inline">{t('Menus.login')}</span>
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}
