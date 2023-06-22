import Link from 'next/link'
import { routes } from '@/constants/routes'

import { createServerClient } from '@/lib/supabase-server'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { NavLink } from '@/components/nav-link'
import { NavMenuButton } from '@/components/nav-menu-button'

const menu = [
  {
    id: 'discover',
    title: 'Discover',
    slug: routes.HOME,
  },
  {
    id: 'blog',
    title: 'Blog',
    slug: routes.BLOG,
  },
  {
    id: 'about',
    title: 'About',
    slug: routes.ABOUT,
  },
]

export const Appbar = async () => {
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="fixed inset-x-0 top-0 z-40 bg-background">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-3 p-3">
        {/* Visible only in small devices */}
        <div className="mr-3 sm:hidden">
          <NavMenuButton mainMenu={menu} />
        </div>
        <div className="grow sm:hidden">
          <Logo height={24} className="mx-auto" />
        </div>

        {/* Visible only in more than 640px width devices */}
        <div className="mr-6 hidden sm:block">
          <Logo height={24} />
        </div>
        <ul className="hidden grow gap-3 font-medium sm:flex">
          {menu.map(({ id, title, slug }) => (
            <li key={id}>
              <NavLink slug={slug}>{title}</NavLink>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          {session ? (
            <Button asChild>
              <Link href={routes.PROJECTS}>Dashboard</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href={routes.LOGIN}>Login</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  )
}
