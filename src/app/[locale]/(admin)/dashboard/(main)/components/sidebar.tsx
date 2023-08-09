'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/constants/routes'

import { cn } from '@/lib/utils'
import { Imagotype } from '@/components/logo'
import { LogoutButton } from '@/components/logout-button'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const Sidebar = () => {
  const { t } = useDictionary()
  const pathname = usePathname()
  const slug = '/' + pathname.split('/').slice(2).join('/')

  const titles = {
    [routes.PROJECTS]: t(`Dashboard.projects`),
    [routes.PROFILE]: t('Dashboard.profile'),
    [routes.PREFERENCES]: t(`Dashboard.preferences`),
  }

  return (
    <div className="w-64 shrink-0 border-r border-outline">
      <section className="flex h-16 items-center gap-3 border-b border-outline px-5">
        <Imagotype />
        <p className="text-2xl">{titles[slug]}</p>
      </section>
      <section className="flex flex-col space-y-2 border-b border-outline p-4">
        <p className="text-sm text-outline">{t('Dashboard.overview')}</p>
        <Link
          href={routes.PROJECTS}
          className={cn(
            'opacity-60 transition hover:opacity-100',
            slug.startsWith(routes.PROJECTS) && 'opacity-100'
          )}
        >
          {t('Dashboard.projects')}
        </Link>
        <Link
          href={routes.PROFILE}
          className={cn(
            'opacity-60 transition hover:opacity-100',
            slug.startsWith(routes.PROFILE) && 'opacity-100'
          )}
        >
          {t('Dashboard.profile')}
        </Link>
      </section>
      <section className="flex flex-col space-y-2 border-b border-outline p-4">
        <p className="text-sm text-outline">{t('Dashboard.account')}</p>
        <Link
          href={routes.PREFERENCES}
          className={cn(
            'opacity-60 transition hover:opacity-100',
            slug.startsWith(routes.PREFERENCES) && 'opacity-100'
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
