import { getDictionary } from '@/lib/dictionaries'
import { fetchProjects } from '@/lib/fetching/projects'
import { Error } from '@/components/error'
import { ProjectCard, ProjectCardSkeleton } from '@/components/project-card'

interface ProjectsFeedProps {
  locale: string
}
export const ProjectsFeed = async ({ locale }: ProjectsFeedProps) => {
  const { t } = await getDictionary(locale)
  const { data: projects, error } = await fetchProjects()

  if (error) return <Error error={error} />

  return projects.map((project) => (
    <ProjectCard key={project.id} t={t} {...project} />
  ))
}

export const LoadingProjects = () => {
  return new Array(5)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
