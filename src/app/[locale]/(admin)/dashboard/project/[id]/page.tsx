import { Suspense } from 'react'

import { getDictionary } from '@/lib/dictionaries'

import Statistics, { LoadingStatistics } from './_statistics/page'

interface ProjectProps {
  params: { id: string; locale: string }
}

export default async function Project({
  params: { locale, id },
}: ProjectProps) {
  const { t } = await getDictionary(locale, 'Projects')

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1>{t('project_statistics')}</h1>
      <Suspense fallback={<LoadingStatistics />}>
        <Statistics locale={locale} id={id} />
      </Suspense>
    </main>
  )
}
