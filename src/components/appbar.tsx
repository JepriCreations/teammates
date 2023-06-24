import Link from 'next/link'
import { routes } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { createServerClient } from '@/lib/supabase-server'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { NavLink } from '@/components/nav-link'
import { NavMenuButton } from '@/components/nav-menu-button'

const menu = (dict: { [x: string]: string }) => [
  {
    id: 'discover',
    title: dict['discover'],
    slug: routes.HOME,
  },
  {
    id: 'blog',
    title: dict['blog'],
    slug: routes.BLOG,
  },
  {
    id: 'about',
    title: dict['about'],
    slug: routes.ABOUT,
  },
]

interface AppbarProps {
  locale: string
}

export const Appbar = async ({ locale }: AppbarProps) => {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const { dict } = await getDictionary(locale, 'Menus')
  const menuItems = menu(dict)

  return (
    <div className="container fixed inset-x-0 top-0 z-40">
      <header className="width-before-scroll-bar relative bg-background py-3">
        <nav className="flex items-center gap-3">
          {/* Visible only in small devices */}
          <div className="mr-3 sm:hidden">
            <NavMenuButton mainMenu={menuItems} />
          </div>

          <div className="mr-6">
            <Logo height={24} />
          </div>

          {/* Visible only in more than 640px width devices */}

          <ul className="hidden grow gap-6 font-medium sm:flex">
            {menuItems.map(({ id, title, slug }) => (
              <li key={id}>
                <NavLink slug={slug}>{title}</NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-6">
            <ModeToggle />
            {session ? (
              <Button asChild>
                <Link href={routes.PROJECTS}>{dict['dashboard']}</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={routes.LOGIN}>{dict['login']}</Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
    </div>
  )
}
