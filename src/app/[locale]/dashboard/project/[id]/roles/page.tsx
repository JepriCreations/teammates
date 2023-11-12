import { Suspense } from 'react'

import { fetchProjectRoles } from '@/lib/fetching/projects'
import { Skeleton } from '@/components/ui/skeleton'
import { NewRoleDialog } from '@/components/dashboard/project/new-role-dialog'
import { RolesFeed } from '@/components/dashboard/project/roles-feed'
import { Error } from '@/components/error'

interface ProjectRolesProps {
  params: { locale: string; id: string }
}

export default function Roles({ params: { id } }: ProjectRolesProps) {
  return (
    <div className="px-4 pb-6 sm:px-12">
      <Suspense fallback={<Loading />}>
        <RolesData projectId={id} />
      </Suspense>
    </div>
  )
}

const RolesData = async ({ projectId }: { projectId: string }) => {
  const { data, error } = await fetchProjectRoles(projectId)

  if (error)
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Error error={error} />
      </div>
    )

  return (
    <>
      <RolesFeed projectId={projectId} data={data.roles} />
      <div className="fixed bottom-4 right-4 mb-20 md:bottom-8 md:right-8 md:mb-0">
        <NewRoleDialog projectId={projectId} categories={data.categories} />
      </div>
    </>
  )
}

const Loading = () => {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {new Array(6).fill('').map((_, idx) => (
        <Skeleton key={idx} className="h-[270px] w-full" />
      ))}
    </div>
  )
}
