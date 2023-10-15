import { Suspense } from 'react'
import { PARAMS_KEYS } from '@/constants/routes'

import { getDictionary, Translator } from '@/lib/dictionaries'
import { fetchProjects } from '@/lib/fetching/projects'
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

  return (
    <>
      <section className="pt-8">
        <div className="space-y-6 text-center">
          <h1 className="balance mx-auto max-w-3xl font-bold">{t('title')}</h1>
          <p className="balance mx-auto max-w-2xl text-body-lg text-outline">
            {t('subtitle')}
          </p>
        </div>
        <section className="mx-auto my-8 max-w-4xl space-y-4">
          <SearchBar
            defaultValue={search}
            placeholder={t('search_placeholder')}
          />
          <div className="flex flex-wrap items-center justify-between gap-3 px-4">
            <ProjectFilters />
            <ProjectsCount
              t={t}
              search={search}
              workMode={typeof work_mode === 'string' ? [work_mode] : work_mode}
              experience={
                typeof experience === 'string' ? [experience] : experience
              }
              rewards={typeof rewards === 'string' ? [rewards] : rewards}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:col-span-3">
            <Suspense key={search + work_mode} fallback={<Loading />}>
              <ProjectsFeed
                locale={locale}
                search={search}
                workMode={
                  typeof work_mode === 'string' ? [work_mode] : work_mode
                }
                experience={
                  typeof experience === 'string' ? [experience] : experience
                }
                rewards={typeof rewards === 'string' ? [rewards] : rewards}
              />
            </Suspense>
          </div>
        </section>
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
}: {
  locale: string
  search?: string
  workMode?: string[]
  experience?: string[]
  rewards?: string[]
}) => {
  const { data, error } = await fetchProjects({
    search,
    work_mode: workMode,
    experience,
    rewards,
  })

  if (error) return <Error error={error} />

  return data.projects.map((project) => (
    <ProjectCard
      key={project.id}
      locale={locale}
      results={data.count ?? 0}
      {...project}
    />
  ))
}

const ProjectsCount = async ({
  t,
  search,
  workMode,
  experience,
  rewards,
}: {
  t: Translator
  search?: string
  workMode?: string[]
  experience?: string[]
  rewards?: string[]
}) => {
  const { data } = await fetchProjects({
    search,
    work_mode: workMode,
    experience,
    rewards,
  })

  return (
    <p className="muted grow text-right text-body-sm">{`${data?.projects
      .length} / ${data?.count ?? 0} ${t('results')}`}</p>
  )
}

const Loading = () => {
  return new Array(5)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
