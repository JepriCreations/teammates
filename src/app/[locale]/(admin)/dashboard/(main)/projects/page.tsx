import { Suspense } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab'
import { Icons } from '@/components/icons'

import UserProjects, { LoadingProjects } from './_projects/user_projects'

interface ProjectsProps {
  params: { locale: string }
}
export default async function Projects({ params: { locale } }: ProjectsProps) {
  const { t } = await getDictionary(locale, 'Projects')

  return (
    <>
      <div className="px-4 pb-6 sm:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <Suspense fallback={<LoadingProjects />}>
            <UserProjects locale={locale} />
          </Suspense>
        </div>
        <div className="fixed bottom-4 right-4 mb-20 md:bottom-8 md:right-8 md:mb-0">
          <Fab asChild>
            <Link href={ROUTES.NEW_PROJECT} className="block">
              <FabIcon>
                <Icons.add />
              </FabIcon>
              <FabLabel>{t('new_project')}</FabLabel>
            </Link>
          </Fab>
        </div>
      </div>
    </>
  )
}
