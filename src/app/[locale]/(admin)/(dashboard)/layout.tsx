import { headers } from 'next/headers'
import Link from 'next/link'
import { routes } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { Sidebar } from '@/components/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function SiteLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { t } = await getDictionary(params.locale)
  const headersList = headers()
  const route = headersList.get('x-route') || ''

  const getTitle = (route: string): string => {
    if (route.startsWith(routes.PROJECTS)) return t('Dashboard.all_projects')
    return ''
  }

  return (
    <main className="flex min-h-[100dvh]">
      <Sidebar title={getTitle(route)} t={t} route={route} />
      <div className="grow">
        <DashboardAppbar>
          <div className="grow" />
          <Link href={routes.HOME}>{t('Auth.discover')}</Link>
        </DashboardAppbar>
        {children}
      </div>
    </main>
  )
}
