import { fetchProjects } from '@/lib/fetching/projects'
import { Error } from '@/components/error'
import { ProjectCard, ProjectCardSkeleton } from '@/components/project-card'

interface ProjectsFeedProps {
  locale: string
}
export const ProjectsFeed = async ({ locale }: ProjectsFeedProps) => {
  const { data, error } = await fetchProjects()

  if (error) return <Error error={error} />

  return data.projects.map((project) => (
    <ProjectCard key={project.id} locale={locale} {...project} />
  ))
}

export const LoadingProjects = () => {
  return new Array(5)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
