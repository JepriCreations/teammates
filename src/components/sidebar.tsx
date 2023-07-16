import Link from 'next/link'
import { routes } from '@/constants/routes'

import { Translator } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

import { LogoutButton } from './logout-button'

interface SidebarProps {
  title?: string
  route: string
  t: Translator
}

export const Sidebar = ({ title, t, route }: SidebarProps) => {
  return (
    <div className="w-64 shrink-0 border-r border-border">
      <section className="flex h-16 items-center gap-3 border-b border-border px-5">
        <Logo withText={false} />
        {title && <p className="text-2xl">{title}</p>}
      </section>
      <section className="border-b border-border p-4">
        <p className="mb-2 text-sm text-muted-foreground">
          {t('Dashboard.projects')}
        </p>
        <Link
          href={routes.PROJECTS}
          className={cn(
            'opacity-60 transition hover:opacity-100',
            route.startsWith(routes.PROJECTS) && 'opacity-100'
          )}
        >
          {t('Dashboard.all_projects')}
        </Link>
      </section>
      <section className="border-b border-border p-4">
        <p className="mb-2 text-sm text-muted-foreground">
          {t('Dashboard.account')}
        </p>
        <Link
          href={routes.PREFERENCES}
          className={cn(
            'opacity-60 transition hover:opacity-100',
            route.startsWith(routes.PREFERENCES) && 'opacity-100'
          )}
        >
          {t('Dashboard.preferences')}
        </Link>
      </section>
      <section className="p-4">
        <LogoutButton />
      </section>
    </div>
  )
}
