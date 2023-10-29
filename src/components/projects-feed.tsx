'use client'

import { FetchProjectParams } from '@/lib/fetching/projects'
import { useFetchProjects } from '@/hooks/use-projects'
import { Button } from '@/components/ui/button'
import { Error } from '@/components/error'
import { ProjectCard, ProjectCardSkeleton } from '@/components/project-card'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const ProjectsFeed = (params: FetchProjectParams) => {
  const { t } = useDictionary()
  const { data, error, isLoading, isValidating, loadMore, isLast } =
    useFetchProjects(params)

  if (error) return <Error error={error} />

  if (isLoading) return <Loading />

  return (
    <>
      {!isLoading && (!data || data.length === 0) && (
        <section className="text-center">
          <p className="muted text-body-lg">{t('no_results')}</p>
        </section>
      )}
      {data?.map((project) => <ProjectCard key={project.id} {...project} />)}
      {isValidating && <Loading />}
      {!isLast && (
        <div>
          <Button
            onClick={loadMore}
            variant="tonal"
            disabled={isLoading}
            className="mx-auto block"
          >
            {t('Projects.load_more')}
          </Button>
        </div>
      )}
    </>
  )
}

const Loading = () => {
  return new Array(5)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
