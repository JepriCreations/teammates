import { Suspense } from 'react'
import Link from 'next/link'
import { routes } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { Button } from '@/components/ui/button'

import UserProjects, { LoadingProjects } from './_projects/user_projects'

interface ProjectsProps {
  params: { locale: string }
}
export default async function Projects({ params: { locale } }: ProjectsProps) {
  const { t } = await getDictionary(locale, 'Projects')

  return (
    <div className="p-6">
      <Button asChild>
        <Link href={routes.NEW_PROJECT}>{t('new_project')}</Link>
      </Button>
      <section className="mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <Suspense fallback={<LoadingProjects />}>
            <UserProjects locale={locale} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
