import { Suspense } from 'react'

import Statistics, { LoadingStatistics } from './_statistics/page'

interface ProjectProps {
  params: { id: string; locale: string }
}

export default async function Project({
  params: { locale, id },
}: ProjectProps) {
  return (
    <main>
      <Suspense fallback={<LoadingStatistics />}>
        <Statistics locale={locale} id={id} />
      </Suspense>
    </main>
  )
}
