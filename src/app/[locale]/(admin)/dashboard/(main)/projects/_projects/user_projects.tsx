import { getDictionary } from '@/lib/dictionaries'
import { fetchUserProjects } from '@/lib/fetching/projects'
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '@/components/dashboard/project-card'
import { Error } from '@/components/error'

interface ProjectsFeedProps {
  locale: string
}
export default async function UserProjects({ locale }: ProjectsFeedProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { data, error } = await fetchUserProjects()

  if (error) return <Error error={error} />

  return data.map((project) => <ProjectCard t={t} {...project} />)
}

export const LoadingProjects = () => {
  return new Array(3)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
