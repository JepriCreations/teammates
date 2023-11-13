import { PARAMS_KEYS } from '@/constants/routes'

import { getDictionary, Translator } from '@/lib/dictionaries'
import { fetchProjects } from '@/lib/fetching/projects'
import { CategoriesFilter } from '@/components/categories-filter'
import { ProjectFilters } from '@/components/project-filters'
import { ProjectsFeed } from '@/components/projects-feed'
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
  const { t } = await getDictionary(locale)
  const search = searchParams.search as string
  const work_mode = searchParams[PARAMS_KEYS.WORK_MODE] as string | string[]
  const experience = searchParams[PARAMS_KEYS.EXPERIENCE] as string | string[]
  const rewards = searchParams[PARAMS_KEYS.REWARDS] as string | string[]
  const category = searchParams[PARAMS_KEYS.CATEGORY] as string

  return (
    <>
      <section className="px-3 pt-8">
        <div className="space-y-6 text-center">
          <h1 className="balance mx-auto max-w-3xl font-bold">
            {t('Site.title')}
          </h1>
          <p className="balance mx-auto max-w-2xl text-body-lg text-outline">
            {t('Site.subtitle')}
          </p>
        </div>
      </section>
      <section className="mx-auto my-8 max-w-4xl space-y-4">
        <div className="px-3">
          <SearchBar
            defaultValue={search}
            placeholder={t('Site.search_placeholder')}
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
            work_mode={typeof work_mode === 'string' ? [work_mode] : work_mode}
            experience={
              typeof experience === 'string' ? [experience] : experience
            }
            rewards={typeof rewards === 'string' ? [rewards] : rewards}
            category={typeof category === 'string' ? category : undefined}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 px-3 sm:col-span-3">
          <ProjectsFeed
            search={search}
            work_mode={typeof work_mode === 'string' ? [work_mode] : work_mode}
            experience={
              typeof experience === 'string' ? [experience] : experience
            }
            rewards={typeof rewards === 'string' ? [rewards] : rewards}
            category={typeof category === 'string' ? category : undefined}
          />
        </div>
      </section>
    </>
  )
}

const ProjectsCount = async ({
  t,
  search,
  work_mode,
  experience,
  rewards,
  category,
}: {
  t: Translator
  search?: string
  work_mode?: string[]
  experience?: string[]
  rewards?: string[]
  category?: string
}) => {
  const { data } = await fetchProjects({
    search,
    work_mode,
    experience,
    rewards,
    category,
  })

  if (!data) return null

  return (
    <p className="muted grow px-3 text-right text-body-sm">{`${
      data.projectCount
    } / ${data.totalNumberOfProjects} ${t('Site.results')}`}</p>
  )
}
