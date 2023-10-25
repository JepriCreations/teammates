import { Suspense } from 'react'
import { PARAMS_KEYS } from '@/constants/routes'

import { getDictionary, Translator } from '@/lib/dictionaries'
import { fetchProjects } from '@/lib/fetching/projects'
import { CategoriesFilter } from '@/components/categories_filter'
import { Error } from '@/components/error'
import { ProjectCard, ProjectCardSkeleton } from '@/components/project-card'
import { ProjectFilters } from '@/components/project-filters'
import { SearchBar } from '@/components/search-bar'

// Revalidate every day
export const revalidate = 86400

interface HomeProps {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function Home({
  params: { locale },
  searchParams,
}: HomeProps) {
  const { t } = await getDictionary(locale, 'Site')
  const search = searchParams.search as string
  const work_mode = searchParams[PARAMS_KEYS.WORK_MODE] as string | string[]
  const experience = searchParams[PARAMS_KEYS.EXPERIENCE] as string | string[]
  const rewards = searchParams[PARAMS_KEYS.REWARDS] as string | string[]
  const category = searchParams[PARAMS_KEYS.CATEGORY] as string
  const page = (searchParams[PARAMS_KEYS.PAGE] as string)
    ? parseInt(searchParams[PARAMS_KEYS.PAGE] as string)
    : 0

  return (
    <>
      <section className="px-3 pt-8">
        <div className="space-y-6 text-center">
          <h1 className="balance mx-auto max-w-3xl font-bold">{t('title')}</h1>
          <p className="balance mx-auto max-w-2xl text-body-lg text-outline">
            {t('subtitle')}
          </p>
        </div>
      </section>
      <section className="mx-auto my-8 max-w-4xl space-y-4">
        <div className="px-3">
          <SearchBar
            defaultValue={search}
            placeholder={t('search_placeholder')}
          />
        </div>
        <div>
          <CategoriesFilter />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ProjectFilters />
          <ProjectsCount
            t={t}
            search={search}
            workMode={typeof work_mode === 'string' ? [work_mode] : work_mode}
            experience={
              typeof experience === 'string' ? [experience] : experience
            }
            rewards={typeof rewards === 'string' ? [rewards] : rewards}
            category={typeof category === 'string' ? category : undefined}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 px-3 sm:col-span-3">
          <Suspense key={search + work_mode} fallback={<Loading />}>
            <ProjectsFeed
              locale={locale}
              search={search}
              workMode={typeof work_mode === 'string' ? [work_mode] : work_mode}
              experience={
                typeof experience === 'string' ? [experience] : experience
              }
              rewards={typeof rewards === 'string' ? [rewards] : rewards}
              category={typeof category === 'string' ? category : undefined}
              page={page}
            />
          </Suspense>
        </div>
      </section>
    </>
  )
}

const ProjectsFeed = async ({
  locale,
  search,
  workMode,
  experience,
  rewards,
  category,
  page,
}: {
  locale: string
  search?: string
  workMode?: string[]
  experience?: string[]
  rewards?: string[]
  category?: string
  page?: number
}) => {
  const { t } = await getDictionary(locale, 'Site')
  const { data, error } = await fetchProjects({
    search,
    work_mode: workMode,
    experience,
    rewards,
    category,
    page,
  })

  if (error) return <Error error={error} />

  if (!data || data.projects.length === 0)
    return (
      <section className="text-center">
        <p className="muted text-body-lg">{t('no_results')}</p>
      </section>
    )

  return (
    <>
      {data.projects.map((project) => (
        <ProjectCard key={project.id} locale={locale} {...project} />
      ))}
    </>
  )
}

const ProjectsCount = async ({
  t,
  search,
  workMode,
  experience,
  rewards,
  category,
}: {
  t: Translator
  search?: string
  workMode?: string[]
  experience?: string[]
  rewards?: string[]
  category?: string
}) => {
  const { data } = await fetchProjects({
    search,
    work_mode: workMode,
    experience,
    rewards,
    category,
  })

  if (!data) return null

  return (
    <p className="muted grow px-3 text-right text-body-sm">{`${
      data.projectCount
    } / ${data.totalNumberOfProjects} ${t('results')}`}</p>
  )
}

const Loading = () => {
  return new Array(5)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
