import { getDictionary } from '@/lib/dictionaries'
import { fetchProjectStatistics } from '@/lib/fetching/projects'
import { Statistics } from '@/components/dashboard/project/statistics'
import { Error } from '@/components/error'

interface ProjectProps {
  params: { id: string; locale: string }
}

export default async function Project({
  params: { locale, id },
}: ProjectProps) {
  const { error, data } = await fetchProjectStatistics(id)

  if (error || !data) return <Error error={error} />

  return <Statistics locale={locale} data={data} />
}
