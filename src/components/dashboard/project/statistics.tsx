import { getDictionary, Translator } from '@/lib/dictionaries'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { HeartTagIcon, HitsIcon, ViewsIcon } from '@/components/icons'
import {
  LoadingStatisticCard,
  StatisticCard,
} from '@/components/statistic-card'

interface StatisticsProps {
  locale: string
  data: {
    total_views: number
    total_hits: number
    percent_views: number
    percent_hits: number
    views?: {
      date: string
      count: number
    }[]
    hits?: {
      date: string
      count: number
    }[]
  }
}

export const Statistics = async ({ locale, data }: StatisticsProps) => {
  const { t } = await getDictionary(locale, 'Projects')
  const views = data?.views ?? []
  const hits = data?.hits ?? []

  return (
    <section className="grid grid-cols-4 gap-4 py-10">
      <Card className="flex flex-col items-center justify-center space-y-2 p-6">
        <HeartTagIcon size={62} className="text-pink-500" />
        <div>
          <p className="text-center text-4xl font-bold">120</p>
          <p className="text-center text-outline">{t('likes')}</p>
        </div>
      </Card>
      <div className="col-span-3 grid grid-cols-2 gap-4">
        <StatisticCard
          title="Total views"
          icon={<ViewsIcon className="text-outline" />}
          value={data.total_views}
          percent={
            (data.percent_views > 0 ? '+' : '') +
            data.percent_views.toFixed(1) +
            '%'
          }
          data={views}
        />
        <StatisticCard
          title="Project hits"
          icon={<HitsIcon className="text-outline" />}
          value={data.total_hits}
          percent={
            (data.percent_hits > 0 ? '+' : '') +
            data.percent_hits.toFixed(1) +
            '%'
          }
          data={hits}
          chartClassName="bg-tertiary"
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
