import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-3 px-3 sm:px-12 lg:grid-cols-2">
      {new Array(6).fill('').map((_, idx) => (
        <Skeleton key={idx} className="h-[270px] w-full" />
      ))}
    </div>
  )
}
