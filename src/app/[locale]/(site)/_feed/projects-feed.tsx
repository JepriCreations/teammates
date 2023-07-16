import { getDictionary } from '@/lib/dictionaries'
import { PostgressError } from '@/lib/errors'
import { fetchProjects } from '@/lib/fetching/projects'
import { ProjectCard, ProjectCardSkeleton } from '@/components/project-card'

interface ProjectsFeedProps {
  locale: string
}
export default async function ProjectsFeed({ locale }: ProjectsFeedProps) {
  const { t } = await getDictionary(locale)
  const { data: projects, error } = await fetchProjects()

  return error ? (
    <ErrorHandler error={error} />
  ) : (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} t={t} {...project} />
      ))}
    </>
  )
}

const ErrorHandler = ({ error }: { error: PostgressError }) => {
  return (
    <div className="text-center">
      <p className="text-xl font-bold">Upps!</p>
      <p>{error.message}</p>
    </div>
  )
}

export const LoadingProjects = () => {
  return new Array(5)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
