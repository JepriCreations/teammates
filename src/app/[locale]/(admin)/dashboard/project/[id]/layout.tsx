import { fetchProjectName } from '@/lib/fetching/projects'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { ProjectSideBar } from '@/components/dashboard/project/sidebar'

interface ProjectLayoutProps {
  children: React.ReactNode
  params: { locale: string; id: string }
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { data: project, error } = await fetchProjectName(params.id)

  if (error) {
    // TODO: handle error
    return <div>{error.message}</div>
  }

  return (
    <div className="flex min-h-[100dvh]">
      <ProjectSideBar projectId={params.id} />
      <div className="grow">
        <DashboardAppbar project={project} className="h-14 justify-between" />
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </div>
    </div>
  )
}
