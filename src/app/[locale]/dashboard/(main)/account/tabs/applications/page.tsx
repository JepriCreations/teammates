import { Suspense } from 'react'
import Link from 'next/link'
import { COUNTRIES } from '@/constants/countries'
import { ROUTES } from '@/constants/routes'

import { ApplicationStatus, ExperienceLevel } from '@/types/collections'
import { getDictionary } from '@/lib/dictionaries'
import { fetchUserApplications } from '@/lib/fetching/profiles'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { ApplicationsStatusNav } from '@/components/dashboard/applications-status-nav'
import { ApplicationDropdownMenu } from '@/components/dashboard/applications/application-actions'
import { Error } from '@/components/error'
import { RoleIcon } from '@/components/role-icons'

interface PageProps {
  params: { locale: string }
  searchParams: { [key: string]: string | undefined }
}

export default function ApplicationsTab({ params, searchParams }: PageProps) {
  const statusFilter =
    (searchParams.status as ApplicationStatus) ?? ApplicationStatus.StandBy

  return (
    <section className="z-0 mx-auto w-full max-w-2xl grow space-y-3 overflow-auto px-3 py-6">
      <ApplicationsStatusNav status={statusFilter} />
      <Suspense fallback={<Loading />} key={statusFilter}>
        <ApplicationsFeed locale={params.locale} status={statusFilter} />
      </Suspense>
    </section>
  )
}

const ApplicationsFeed = async ({
  locale,
  status,
}: {
  locale: string
  status?: ApplicationStatus
}) => {
  const { t } = await getDictionary(locale)
  const { error, data } = await fetchUserApplications({ status })

  if (error) return <Error error={error} />

  if (status && data.length === 0) {
    return (
      <div>
        <p className="muted balance mt-8 text-body-lg">
          {t('Applications.no_applications')}
        </p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div>
        <p className="muted balance mt-8 text-body-lg">
          {t('Applications.nothing_to_show')}
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-3">
      {data.map(
        ({
          project_id,
          user_id,
          role_id,
          project,
          role,
          status,
          created_at,
        }) => (
          <Card key={project_id + '-' + role_id} variant="outlined">
            <CardHeader>
              <div className="flex justify-between gap-x-3">
                <div className="grow">
                  <p className="text-title-lg">{t(`Roles.${role.name}`)}</p>
                  <Popover>
                    <PopoverTrigger className="w-fit">
                      <p className="text-title-sm text-onSurfaceVariant">
                        {project.name}
                      </p>
                    </PopoverTrigger>
                    <PopoverPortal>
                      <PopoverContent className="ml-2 max-w-xs p-4">
                        <p className="text-title-md">{project.name}</p>
                        <div className="space-y-2 text-body-sm">
                          <p>{project.summary}</p>
                          <p className="text-onSurfaceVariant/70">{`${
                            project.city
                          }, ${
                            COUNTRIES[project.country as keyof typeof COUNTRIES]
                              .name
                          }`}</p>
                        </div>
                        <Button asChild className="ml-auto mt-3 block">
                          <Link href={ROUTES.PROJECT(project.slug)}>
                            {t('Applications.view_project')}
                          </Link>
                        </Button>
                        <PopoverArrow />
                      </PopoverContent>
                    </PopoverPortal>
                  </Popover>
                </div>
                <ApplicationDropdownMenu userId={user_id} roleId={role_id} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Experience level */}
                <div className="rounded-md bg-primaryContainer/50 p-4 text-center text-onPrimaryContainer">
                  <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                    {RoleIcon.experienceLevelIcon(
                      role?.exp_level as ExperienceLevel
                    )}
                    <p className="text-label-lg font-medium">
                      {t('Roles.experience_level')}
                    </p>
                  </div>
                  <p className="w-full truncate">
                    {t(`Roles.Levels.${role?.exp_level}`)}
                  </p>
                </div>
                {/* Rewards */}
                <div className="rounded-md bg-secondaryContainer/50 p-4 text-center text-onSecondaryContainer">
                  <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                    {RoleIcon.rewardIcon(role?.rewards ?? [])}
                    <p className="text-label-lg font-medium">
                      {t('Roles.rewards')}
                    </p>
                  </div>
                  <p>
                    {role?.rewards
                      .map((r) => t(`Roles.Rewards.${r}`))
                      .join(', ')}
                  </p>
                </div>
                {/* Work mode */}
                <div className="rounded-md bg-tertiaryContainer/50 p-4 text-center text-onTertiaryContainer">
                  <div className="wi-full mb-1 flex flex-col items-center justify-center gap-2 opacity-60 sm:flex-row">
                    {RoleIcon.workModeIcon(role?.work_mode ?? '')}
                    <p className="text-label-lg font-medium">
                      {t('Roles.work_mode')}
                    </p>
                  </div>
                  <p className="w-full truncate">
                    {t(`Roles.Workmode.${role?.work_mode}`)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p>{t(`Applications.Status.${status}`)}</p>
              <p className="muted">{formatDate(created_at)}</p>
            </CardFooter>
          </Card>
        )
      )}
    </section>
  )
}

const Loading = () => (
  <div className="space-y-3">
    {new Array(3).fill(0).map((_, index) => (
      <Skeleton key={index} className="h-56 w-full" />
    ))}
  </div>
)
