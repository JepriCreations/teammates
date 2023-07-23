import { getDictionary } from '@/lib/dictionaries'
import { PostgressError } from '@/lib/errors'
import { fetchProjectStatistics } from '@/lib/fetching/projects'
import { Card } from '@/components/ui/card'
import { HeartTagIcon, HitsIcon, ViewsIcon } from '@/components/icons'
import { StatisticCard } from '@/components/statistic-card'

interface StatisticsProps {
  locale: string
  id: string
}

const hits = [
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
  { count: Math.floor(Math.random() * (50 - 0 + 1) + 0) },
]

export default async function Statistics({ locale, id }: StatisticsProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { error, data } = await fetchProjectStatistics(id)

  const views = data?.views ?? []

  return error ? (
    <ErrorHandler error={error} />
  ) : (
    <>
      <section className="grid grid-cols-4 gap-4 py-10">
        <Card className="flex flex-col items-center justify-center space-y-2 p-6">
          <HeartTagIcon size={62} className="text-pink-500" />
          <div>
            <p className="text-center text-4xl font-bold">120</p>
            <p className="text-center text-muted-foreground">Likes</p>
          </div>
        </Card>
        <div className="col-span-3 grid grid-cols-2 gap-4">
          <StatisticCard
            title="Total views"
            icon={<ViewsIcon className="text-muted-foreground" />}
            value={data.total_views}
            percent="+8.2%"
            data={views}
          />
          <StatisticCard
            title="Project hits"
            icon={<HitsIcon className="text-muted-foreground" />}
            value={12}
            percent="-6.2%"
            data={hits}
            chartClassname="bg-blue-400"
          />
        </div>
      </section>
    </>
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

// response = await client
//     .from(table)
//     .upsert({
//         'page_id': pageId,
//         'date': date,
//         'views': views,
//     }, onConflict: {
//         'columns': ['page_id', 'date'],
//         'update': 'views = excluded.views + 1',
//     }).execute();
