import Link from 'next/link'
import { routes } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { DashboardAppbar } from '@/components/dashboard/appbar'

import { Sidebar } from './components/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function SiteLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { t } = await getDictionary(params.locale)

  return (
    <main className="flex min-h-[100dvh]">
      <Sidebar />
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
