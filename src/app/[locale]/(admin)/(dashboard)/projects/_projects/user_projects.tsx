import { getDictionary } from '@/lib/dictionaries'
import { PostgressError } from '@/lib/errors'
import { fetchUserProject } from '@/lib/fetching/projects'
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '@/components/dashboard/project-card'

interface ProjectsFeedProps {
  locale: string
}
export default async function UserProjects({ locale }: ProjectsFeedProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { data, error } = await fetchUserProject()

  return error ? (
    <ErrorHandler error={error} />
  ) : (
    data.map((project) => <ProjectCard t={t} {...project} />)
  )
}

const ErrorHandler = ({ error }: { error: PostgressError }) => {
  return (
    <div className="col-span-4 text-center">
      <p className="text-xl font-bold">Upps!</p>
      <p>{error.message}</p>
    </div>
  )
}

export const LoadingProjects = () => {
  return new Array(3)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
