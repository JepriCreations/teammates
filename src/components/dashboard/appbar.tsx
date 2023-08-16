'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes, slugs } from '@/constants/routes'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AngleRightSmallIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface DashboardAppbarProps {
  project?: { id: string; name: string }
  className?: string
}
export const DashboardAppbar = ({
  project,
  className,
}: DashboardAppbarProps) => {
  const { t } = useDictionary()
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  pathSegments.splice(0, 2)

  const path = '/' + pathSegments.join('/')
  const pos_1 = pathSegments[3]
  const pos_2 = pathSegments[5]

  const getUrl = (slug: string) => {
    if (!project?.id) return

    switch (slug) {
      case slugs.DETAILS:
        return routes.DETAILS(project?.id)
      case slugs.ROLES:
        return routes.ROLES(project?.id)
      default:
        break
    }
  }

  const links = []
  project &&
    links.push({ label: project.name, url: routes.STATISTICS(project.id) })
  pos_1 && links.push({ label: t(`Dashboard.${pos_1}`), url: getUrl(pos_1) })
  pos_2 && links.push({ label: t(`Dashboard.${pos_2}`), url: getUrl(pos_2) })

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-16 items-center gap-3 border-b border-outline bg-surface px-5',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button asChild variant="link">
          <Link href={routes.PROJECTS}>{t('Dashboard.projects')}</Link>
        </Button>
        {links.map(({ label, url }) => {
          const isCurrent = path === url
          return (
            <React.Fragment key={label}>
              <AngleRightSmallIcon className="text-outline" />
              {!isCurrent && url ? (
                <Button asChild variant="link">
                  <Link href={url}>{label}</Link>
                </Button>
              ) : (
                <span className="text-sm font-medium">{label}</span>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </header>
  )
}
