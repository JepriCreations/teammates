import { fetchUserProject } from '@/lib/fetching/projects'
import { ProjectDetailsForm } from '@/components/dashboard/project/project-details-form'
import { Error } from '@/components/error'

interface ProjectDetailsProps {
  params: { id: string; locale: string }
}

export default async function Details({ params: { id } }: ProjectDetailsProps) {
  const { data, error } = await fetchUserProject(id)

  if (error || !data) return <Error error={error} />

  return (
    <div className="mx-auto w-full max-w-6xl space-y-3 px-4 pb-6 sm:px-12">
      <ProjectDetailsForm data={data} />
    </div>
  )
}
