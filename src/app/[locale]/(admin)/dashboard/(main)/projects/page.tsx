import { Suspense } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { getDictionary } from '@/lib/dictionaries'
import { fetchUserProjects } from '@/lib/fetching/projects'
import { Fab, FabIcon, FabLabel } from '@/components/ui/fab'
import {
  ProjectCard,
  ProjectCardSkeleton,
} from '@/components/dashboard/project-card'
import { Error } from '@/components/error'
import { Icons } from '@/components/icons'

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
            <UserProjectsFeed locale={locale} />
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

interface ProjectsFeedProps {
  locale: string
}

const UserProjectsFeed = async ({ locale }: ProjectsFeedProps) => {
  const { t } = await getDictionary(locale, 'Projects')
  const { data, error } = await fetchUserProjects()

  if (error)
    return (
      <div className="col-span-full">
        <div className="mx-auto max-w-4xl">
          <Error error={error} />
        </div>
      </div>
    )

  if (data.length === 0)
    return (
      <>
        <div>
          <p className="muted text-body-lg">{t('no_projects_to_show')}</p>
        </div>
        <div className="fixed bottom-4 right-4 mb-20 flex -translate-x-[20%] -translate-y-12 gap-3 text-onSurface md:bottom-8 md:right-8 md:mb-0">
          <p className="text-center text-body-md md:text-body-lg">
            {t('no_projects')}
          </p>
          <svg viewBox="0 0 256 257" fill="none" className="ml-auto h-24">
            <path
              d="M226.836 209.79C226.698 209.81 226.569 209.872 226.429 209.872C226.347 209.872 226.274 209.833 226.193 209.824C226.086 209.821 225.987 209.858 225.881 209.841C225.701 209.816 225.552 209.723 225.386 209.664C225.366 209.655 225.35 209.653 225.333 209.644C224.743 209.425 224.256 209.051 223.933 208.54L199.394 183.997C198.295 182.899 198.295 181.123 199.394 180.024C200.492 178.925 202.268 178.925 203.367 180.024L224.189 200.849C228.797 157.437 212.44 120.927 178.687 100.119C177.363 99.304 176.953 97.573 177.768 96.2523C178.583 94.9316 180.314 94.5214 181.634 95.3363C213.393 114.908 230.641 147.49 230.641 186.594C230.641 190.823 230.416 195.136 230.009 199.509L249.493 180.024C250.592 178.925 252.368 178.925 253.466 180.024C254.014 180.572 254.29 181.291 254.29 182.011C254.29 182.73 254.014 183.449 253.466 183.997L228.418 209.046C228.05 209.414 227.581 209.619 227.083 209.74C227.002 209.765 226.92 209.774 226.836 209.79Z"
              fill="currentColor"
            />
            <path
              d="M91.7565 49.6793C121.309 55.6815 147.569 73.2918 158.663 94.5522C161.273 99.5906 162.549 105.553 162.549 111.932C162.549 121.947 159.402 132.987 153.321 143.084C146.762 153.984 137.635 162.49 127.623 167.039C117.257 171.749 107.155 171.698 99.1749 166.893C83.0652 157.196 81.1375 130.725 94.8785 107.9C94.8869 107.883 94.9066 107.874 94.915 107.86C100.802 98.0956 108.937 90.09 117.822 85.3186C119.188 84.5852 120.893 85.0966 121.627 86.4651C121.854 86.8866 121.961 87.3446 121.961 87.7914C121.961 88.7917 121.425 89.764 120.48 90.2698C112.458 94.5803 105.079 101.872 99.7004 110.805C99.692 110.817 99.6807 110.822 99.6723 110.833C87.55 131.004 88.6206 153.978 102.069 162.082C108.414 165.901 116.662 165.845 125.294 161.922C134.277 157.839 142.522 150.12 148.502 140.187C157.468 125.296 159.497 108.4 153.672 97.1459C143.334 77.3354 118.592 60.866 90.6325 55.1897C59.6129 48.8869 29.5516 56.1086 5.98409 75.5257C4.78703 76.512 3.01673 76.3406 2.02761 75.1436C1.0413 73.9465 1.2099 72.1762 2.40977 71.1871C27.3092 50.6741 59.0397 43.0337 91.7565 49.6793Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </>
    )

  return data.map((project) => <ProjectCard t={t} {...project} />)
}

const LoadingProjects = () => {
  return new Array(3)
    .fill('')
    .map((_, index) => <ProjectCardSkeleton key={index} />)
}
