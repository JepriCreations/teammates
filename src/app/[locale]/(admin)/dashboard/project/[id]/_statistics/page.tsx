import { getDictionary } from '@/lib/dictionaries'
import { PostgressError } from '@/lib/errors'
import { fetchProjectStatistics } from '@/lib/fetching/projects'
import { ViewsIcon } from '@/components/icons'
import { StatisticCard } from '@/components/statistic-card'

interface StatisticsProps {
  locale: string
  id: string
}

export default async function Statistics({ locale, id }: StatisticsProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { error, data } = await fetchProjectStatistics(id)

  const views = data?.views ?? []

  return error ? (
    <ErrorHandler error={error} />
  ) : (
    <main className="p-6">
      <h1>Project Statistics</h1>
      <section className="grid grid-cols-3 gap-4 py-10">
        <StatisticCard
          title="Total views"
          icon={<ViewsIcon className="text-muted-foreground" />}
          value={data.total_views}
          percent="+8.2%"
          data={views}
        />
      </section>
    </main>
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

export const LoadingStatistics = () => {
  return <div>Loading data...</div>
}
