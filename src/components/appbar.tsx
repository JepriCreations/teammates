import Link from 'next/link'
import { routes } from '@/constants/routes'

import { createServerClient } from '@/lib/supabase-server'
import { Button } from '@/components/ui/button'

import { Logo } from './logo'
import { NavLink } from './nav-link'

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
    <div className="flex items-center justify-between gap-3 px-8 py-3">
      <div className="hidden sm:block">
        <Logo height={24} />
      </div>
      <div className="sm:hidden">
        <Logo height={24} withText={false} />
      </div>
      <div className="ml-6 flex gap-6 font-medium">
        {menu.map(({ id, title, slug }) => (
          <NavLink key={id} slug={slug}>
            {title}
          </NavLink>
        ))}
      </div>
      <div className="grow" />
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
    </div>
  )
}
