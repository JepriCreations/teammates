import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectStatistics } from '@/lib/fetching/projects'
import { Statistics } from '@/components/dashboard/project/statsistics'
import { Error } from '@/components/error'

interface ProjectProps {
  params: { id: string; locale: string }
}

export default async function Project({
  params: { locale, id },
}: ProjectProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { error, data } = await fetchProjectStatistics(id)

  if (error || !data) return <Error error={error} />

  return <Statistics t={t} data={data} />
}
