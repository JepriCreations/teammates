interface StatisticCardProps {
  title: string
  value: string | number
  percent: string | number
  icon?: React.ReactNode
  data?: { count: number }[]
}

export const StatisticCard = ({
  title,
  icon,
  value,
  percent,
  data,
}: StatisticCardProps) => {
  const counts = data?.map(({ count }) => count) ?? [0]
  const max = Math.max(...counts)

  return (
    <div className="border border-border px-6 py-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-muted-foreground">{title}</p>
        {icon}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 flex flex-col space-y-2">
          <p className="text-4xl font-medium">{value}</p>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-success">{percent}</span> than
            last month
          </p>
        </div>
        <div className="mt-auto flex h-[80%] pb-1 pt-2">
          <div className="flex h-full w-full items-end gap-1">
            {data?.map(({ count }) => (
              <span
                className="bg-accent"
                style={{
                  width: `calc(100%/${counts.length})`,
                  height: `${(count * 100) / max}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
