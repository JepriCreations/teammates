import { cn } from '@/lib/utils'

interface BarchartProps {
  className?: string
  data?: { value: number }[]
}

export const Barchart = ({ className, data }: BarchartProps) => {
  if (!data || data?.length === 0) return null

  const counts = data?.map(({ value }) => value) ?? [0]
  const max = Math.max(...counts)

  return (
    <div className="flex h-full w-full items-end gap-1 overflow-hidden">
      {data?.map(({ value }, index) => (
        <span
          key={`bar-${index}`}
          className={cn(
            'origin-bottom animate-grown-up bg-primary opacity-0 duration-300',
            className
          )}
          style={{
            animationDelay: `${(index + 3) * 50}ms`,
            width: `calc(100% / ${counts.length})`,
            height: '100%',
            maxHeight: value > 0 ? `${(value * 100) / max}%` : '0.5px',
            minHeight: value > 0 ? '1px' : '0px',
            animationFillMode: 'forwards',
          }}
        />
      ))}
    </div>
  )
}
