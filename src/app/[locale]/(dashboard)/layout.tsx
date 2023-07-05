import { headers } from 'next/headers'
import { routes } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { Sidebar } from '@/components/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function SiteLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { dict } = await getDictionary(params.locale)
  const headersList = headers()
  const route = headersList.get('x-route') || ''

  const getTitle = (route: string): string => {
    if (route.startsWith(routes.PROJECTS)) return dict.Dashboard.all_projects
    return ''
  }

  return (
    <main className="flex min-h-[100dvh]">
      <Sidebar title={getTitle(route)} dict={dict} route={route} />
      <div className="grow">{children}</div>
    </main>
  )
}
