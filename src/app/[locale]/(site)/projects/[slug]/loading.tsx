import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap gap-4 px-3">
      <div className="min-w-full grow md:min-w-0">
        <section className="space-y-4">
          <Skeleton className="h-[220px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </section>
      </div>
      <div className="w-full shrink-0 space-y-4 md:w-[220px]">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[180px] w-full" />
        <Skeleton className="h-[180px] w-full" />
      </div>
    </div>
  )
}
