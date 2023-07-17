import { getDictionary } from '@/lib/dictionaries'
import { PostgressError } from '@/lib/errors'
import { fetchUserProject } from '@/lib/fetching/projects'
import { PostForm } from '@/components/forms/project/post-form'

interface ProjectDataProps {
  locale: string
  id: string
}

export default async function ProjectData({ locale, id }: ProjectDataProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { error, data } = await fetchUserProject(id)

  return error ? (
    <ErrorHandler error={error} />
  ) : (
    <section className="grid grid-cols-4">
      <div className="col-span-3">
        <PostForm {...data} />
      </div>
      <div className="border-l border-border p-6">
        <p className="text-xl font-semibold">{t('statistics')}</p>
        <div className="grid grid-cols-1 gap-3">
          <p>{`${t('views')}: ${data.views}`}</p>
        </div>
      </div>
    </section>
  )
}

const ErrorHandler = ({ error }: { error: PostgressError }) => {
  return (
    <div className="col-span-4 text-center">
      <p className="text-xl font-bold">Upps!</p>
      <p>{error.message}</p>
    </div>
  )
}

export const LoadingProject = () => {
  return <div>Loading data...</div>
}
