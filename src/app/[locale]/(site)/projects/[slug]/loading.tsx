import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl">
      <section className="w-full space-y-3">
        <section className="flex grow items-start gap-4 sm:gap-6">
          <div className="mt-1 aspect-square h-12 sm:h-[62px]">
            <Skeleton className="h-full w-full" />
          </div>

          <div className="grow space-y-2">
            <div className="mb-3 mt-1 flex flex-wrap items-end gap-x-6 gap-y-2">
              <Skeleton className="h-6 w-[30%]" />
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
        </section>
        <Skeleton className="h-4 w-[80%]" />
      </section>

      <Separator className="my-8" />

      <section className="mb-12 space-y-4">
        <Skeleton className="h-10 w-[50%]" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-[60%]" />
        </div>
      </section>

      <section className="mb-12 space-y-2">
        <Skeleton className="h-10 w-[50%]" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-96 w-full" />
      </section>
    </div>
  )
}
