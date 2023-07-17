import { Suspense } from 'react'

import ProjectData, { LoadingProject } from './_project/project_data'

interface ProjectProps {
  params: { id: string; locale: string }
}

export default async function Project({
  params: { locale, id },
}: ProjectProps) {
  return (
    <main>
      <Suspense fallback={<LoadingProject />}>
        <ProjectData locale={locale} id={id} />
      </Suspense>
    </main>
  )
}
