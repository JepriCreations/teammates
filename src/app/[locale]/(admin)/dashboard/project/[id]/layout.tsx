import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectName } from '@/lib/fetching/projects'
import { Button } from '@/components/ui/button'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { ProjectSideBar } from '@/components/dashboard/project/sidebar'
import { Icons } from '@/components/icons'
import { Imagotype } from '@/components/logo'

interface ProjectLayoutProps {
  children: React.ReactNode
  params: { locale: string; id: string }
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { t } = await getDictionary(params.locale)
  const { data: project, error } = await fetchProjectName(params.id)

  if (error) {
    // TODO: handle error
    return <div>{error.message}</div>
  }

  return (
    <main className="min-h-[100dvh] pb-20 md:pb-0">
      <ProjectSideBar projectId={params.id} />
      <div className="flex flex-col md:pl-24">
        <DashboardAppbar className="gap-1">
          <div className="mr-3">
            <Imagotype />
          </div>
          <Button asChild variant="text">
            <Link href={ROUTES.PROJECTS}>{t('Dashboard.projects')}</Link>
          </Button>
          <Icons.angleRightSmall className="text-outline" />
          <Button disabled variant="text">
            {project.name}
          </Button>
        </DashboardAppbar>
        {children}
      </div>
    </main>
  )
}
