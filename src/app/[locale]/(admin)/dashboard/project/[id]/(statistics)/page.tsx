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

  return (
    <div className="px-4 pb-6 sm:px-12">
      <Statistics locale={locale} data={data} />
    </div>
  )
}
