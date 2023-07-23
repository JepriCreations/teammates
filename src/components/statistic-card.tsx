import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

import { Barchart } from './bar-char'

interface StatisticCardProps {
  title: string
  value: string | number
  percent: string
  icon?: React.ReactNode
  data?: { count: number }[]
  chartClassname?: string
}

export const StatisticCard = ({
  title,
  icon,
  value,
  percent,
  data,
  chartClassname,
}: StatisticCardProps) => {
  const values = data?.map(({ count }) => ({ value: count }))

  return (
    <Card className="flex flex-col justify-between px-6 py-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-muted-foreground">{title}</p>
        {icon}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 flex flex-col space-y-2">
          <p className="text-[4rem] font-medium">{value}</p>
          <p className="text-sm text-muted-foreground">
            <span
              className={cn(
                'font-semibold',
                String(percent).startsWith('-')
                  ? 'text-red-600 dark:text-red-300'
                  : 'text-green-600 dark:text-green-300'
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
