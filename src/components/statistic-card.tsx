import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { Barchart } from './bar-char'

interface StatisticCardProps {
  title: string
  value: string | number
  percent: string
  loading?: boolean
  icon?: React.ReactNode
  data?: { count: number }[]
  chartClassname?: string
}

export const StatisticCard = ({
  title,
  icon,
  value,
  percent,
  loading,
  data,
  chartClassname,
}: StatisticCardProps) => {
  const values = data?.map(({ count }) => ({ value: count }))

  if (loading) return <LoadingStatisticCard icon={icon} title={title} />

  return (
    <Card className="flex flex-col justify-between px-6 py-4">
      <div className="mb-2 flex items-center justify-between">
        <p>{title}</p>
        {icon}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 flex flex-col space-y-2">
          <p className="text-[4rem] font-medium">{value}</p>
          <p className="text-sm text-outline">
            <span
              className={cn(
                'font-semibold',
                String(percent).startsWith('-') ? 'text-error' : 'text-success'
              )}
            >
              {percent}
            </span>{' '}
            than last month
          </p>
        </div>
        <div className="mt-auto flex h-[80%] pb-1 pt-2">
          <Barchart data={values} className={chartClassname} />
        </div>
      </div>
    </Card>
  )
}

export const LoadingStatisticCard = ({
  icon,
  title,
}: Partial<StatisticCardProps>) => (
  <Card className="flex flex-col gap-6 px-6 py-4">
    <div className="mb-2 flex items-center justify-between">
      <p>{title}</p>
      {icon}
    </div>
    <Skeleton className="h-14 w-[35%]" />
    <Skeleton className="h-4 w-[70%]" />
  </Card>
)
