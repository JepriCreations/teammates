import { Suspense } from 'react'

import { getDictionary } from '@/lib/dictionaries'

import ProjectsFeed, { LoadingProjects } from './_feed/projects-feed'
import Side from './_side/side'

// Revalidate every day
export const revalidate = 86400

interface HomeProps {
  params: { locale: string }
}
export default async function Home({ params: { locale } }: HomeProps) {
  const { t } = await getDictionary(locale, 'Site')

  return (
    <>
      <section className="container mx-auto pt-16">
        <div className="text-center">
          <h1 className="mx-auto mb-4 max-w-3xl font-bold leading-snug">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-lg text-base text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <section className="mx-auto my-8 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="grid grid-cols-1 gap-3 sm:col-span-3">
            <Suspense fallback={<LoadingProjects />}>
              <ProjectsFeed locale={locale} />
            </Suspense>
          </div>
          <Side />
        </section>
      </section>
    </>
  )
}
