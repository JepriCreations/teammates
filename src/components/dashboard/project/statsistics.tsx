import { getDictionary, Translator } from '@/lib/dictionaries'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HeartTagIcon, HitsIcon, ViewsIcon } from '@/components/icons'
import {
  LoadingStatisticCard,
  StatisticCard,
} from '@/components/statistic-card'

interface StatisticsProps {
  t: Translator
  data: {
    total_views: number
    views?: {
      date: string
      count: number
    }[]
  }
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

export const Statistics = ({ t, data }: StatisticsProps) => {
  const views = data?.views ?? []

  return (
    <section className="grid grid-cols-4 gap-4 py-10">
      <Card className="flex flex-col items-center justify-center space-y-2 p-6">
        <HeartTagIcon size={62} className="text-pink-500" />
        <div>
          <p className="text-center text-4xl font-bold">120</p>
          <p className="text-center text-outline">Likes</p>
        </div>
      </Card>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <StatisticCard
          title="Total views"
          icon={<ViewsIcon className="text-outline" />}
          value={data.total_views}
          percent="+8.2%"
          data={views}
        />
        <StatisticCard
          title="Project hits"
          icon={<HitsIcon className="text-outline" />}
          value={12}
          percent="-6.2%"
          data={hits}
          chartClassname="bg-tertiary"
        />
      </div>
    </section>
  )
}

export const LoadingStatistics = () => {
  return (
    <section className="grid grid-cols-4 gap-4 py-10">
      <Card className="flex flex-col items-center justify-center space-y-2 p-6">
        <HeartTagIcon size={62} className="text-pink-500" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-12" />
      </Card>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <LoadingStatisticCard
          title="Total views"
          icon={<ViewsIcon className="text-outline" />}
        />
        <LoadingStatisticCard
          title="Project hits"
          icon={<HitsIcon className="text-outline" />}
        />
      </div>
    </section>
  )
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
