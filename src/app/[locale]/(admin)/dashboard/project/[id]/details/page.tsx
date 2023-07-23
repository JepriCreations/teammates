import { getDictionary } from '@/lib/dictionaries'
import { fetchUserProject } from '@/lib/fetching/projects'

import { ProjectDetailsForm } from './components/project-details-form'

interface ProjectDetailsProps {
  params: { id: string; locale: string }
}

export default async function Details({
  params: { locale, id },
}: ProjectDetailsProps) {
  const { t } = await getDictionary(locale, 'Projects')
  const { data, error } = await fetchUserProject(id)

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-10">{t('project_details')}</h1>
      {data && <ProjectDetailsForm data={data} />}
    </main>
  )
}
