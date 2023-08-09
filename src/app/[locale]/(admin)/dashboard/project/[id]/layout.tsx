import Link from 'next/link'
import { routes } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectName } from '@/lib/fetching/projects'
import { Button } from '@/components/ui/button'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { ProjectSideBar } from '@/components/dashboard/project/sidebar'
import { AngleRightSmallIcon } from '@/components/icons'

interface ProjectLayoutProps {
  children: React.ReactNode
  params: { locale: string; id: string }
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { data } = await fetchProjectName(params.id)
  const { t } = await getDictionary(params.locale)

  return (
    <div className="flex min-h-[100dvh]">
      <ProjectSideBar projectId={params.id} />
      <div className="grow">
        <DashboardAppbar className="h-14 justify-between">
          <div className="flex items-center">
            <Button asChild variant="link" className="min-w-0">
              <Link href={routes.PROJECTS}>{t('Dashboard.projects')}</Link>
            </Button>
            <AngleRightSmallIcon className="text-outline" />
            <p className="px-4 font-medium">{data?.name}</p>
          </div>
        </DashboardAppbar>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </div>
    </div>
  )
}
