import { Suspense } from 'react'

import { getDictionary } from '@/lib/dictionaries'
import { LoadingProjects, ProjectsFeed } from '@/components/projects-feed'

// Revalidate every day
export const revalidate = 86400

interface HomeProps {
  params: { locale: string }
}
export default async function Home({ params: { locale } }: HomeProps) {
  const { t } = await getDictionary(locale, 'Site')

  return (
    <>
      <section className="pt-8">
        <div className="space-y-6 text-center">
          <h1 className="balance mx-auto max-w-3xl font-bold">{t('title')}</h1>
          <p className="balance mx-auto max-w-2xl text-body-lg text-outline">
            {t('subtitle')}
          </p>
        </div>
        <section className="mx-auto my-8 max-w-4xl">
          <div className="grid grid-cols-1 gap-3 sm:col-span-3">
            <Suspense fallback={<LoadingProjects />}>
              <ProjectsFeed locale={locale} />
            </Suspense>
          </div>
        </section>
      </section>
    </>
  )
}
