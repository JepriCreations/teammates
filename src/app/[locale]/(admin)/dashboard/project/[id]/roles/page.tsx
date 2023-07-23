import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectRoles } from '@/lib/fetching/projects'

import { RolesFeed } from './components/roles-feed'
import Error from './error'

interface ProjectRolesProps {
  params: { id: string; locale: string }
}

export default async function Roles({
  params: { id, locale },
}: ProjectRolesProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { data, error } = await fetchProjectRoles(id)

  if (!data && error) return <Error error={error} />

  return <>{data && <RolesFeed projectId={id} data={data} />}</>
}
