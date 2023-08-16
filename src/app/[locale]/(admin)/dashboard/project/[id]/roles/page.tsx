import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectRoles } from '@/lib/fetching/projects'
import { RolesFeed } from '@/components/dashboard/project/roles-feed'
import { Error } from '@/components/error'

interface ProjectRolesProps {
  params: { locale: string; id: string }
}

export default async function Roles({
  params: { locale, id },
}: ProjectRolesProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { data, error } = await fetchProjectRoles(id)

  if (!data && error) return <Error error={error} />

  return <RolesFeed projectId={id} data={data} />
}
