import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-4 px-3 py-6 md:px-12">
      {new Array(6).fill('').map((_, idx) => (
        <Skeleton key={idx} className="h-60 w-full" />
      ))}
    </div>
  )
}
