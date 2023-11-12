import { Suspense } from 'react'
import { linksIcons, LinksIconsType } from '@/constants/links'

import { ApplicationStatus } from '@/types/collections'
import { getDictionary } from '@/lib/dictionaries'
import { fetchRole, fetchRoleApplications } from '@/lib/fetching/roles'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { IconButton } from '@/components/ui/icon-button'
import { Skeleton } from '@/components/ui/skeleton'
import { ApplicationStateButton } from '@/components/application-state-button'
import { ApplicationsStatusNav } from '@/components/dashboard/applications-status-nav'
import { RoleDetailsAccordion } from '@/components/dashboard/applications/role-details-accordion'
import { Error } from '@/components/error'

interface RoleApplicationsProps {
  params: { locale: string; id: string; role_id: string }
  searchParams: { [key: string]: string | undefined }
}

export default async function RoleApplications({
  params,
  searchParams,
}: RoleApplicationsProps) {
  const { t } = await getDictionary(params.locale)

  return (
    <div className="space-y-6 px-4 pb-6 md:px-12">
      <Suspense fallback={<LoadingRoleInfo />}>
        <RolePreview role_id={params.role_id} />
      </Suspense>
      <section className="space-y-4">
        <p className="text-title-lg">{t('Roles.applications')}</p>
        <ApplicationsStatusNav
          status={
            (searchParams.status as ApplicationStatus) ??
            ApplicationStatus.StandBy
          }
        />
        <Suspense fallback={<Loading />} key={searchParams.status}>
          <ApplicationsFeed
            locale={params.locale}
            role_id={params.role_id}
            status={
              (searchParams.status as ApplicationStatus) ??
              ApplicationStatus.StandBy
            }
          />
        </Suspense>
      </section>
    </div>
  )
}

const RolePreview = async ({ role_id }: { role_id: string }) => {
  const { error, data } = await fetchRole({ role_id })

  if (error)
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Error error={error} />
      </div>
    )

  return <RoleDetailsAccordion data={data} />
}

const ApplicationsFeed = async ({
  locale,
  role_id,
  status,
}: {
  locale: string
  role_id: string
  status: ApplicationStatus
}) => {
  const { t } = await getDictionary(locale)
  const { error, data } = await fetchRoleApplications({ role_id, status })

  if (error)
    return (
      <div className="mx-auto w-full max-w-4xl">
        <Error error={error} />
      </div>
    )

  return (
    <>
      {data.map((application) => {
        const links: { name: string; url: string }[] =
          JSON.parse(JSON.stringify(application.profile?.links)) ?? []
        return (
          <Card key={application.created_at_time} className="space-y-2 p-4">
            <div className="flex justify-between">
              <p className="text-body-lg font-medium">
                {application.profile?.name}
              </p>
              <p className="muted text-body-sm">
                {formatDate(application.created_at ?? '')}
              </p>
            </div>
            <div>
              <p className="muted mr-2 min-w-[80px] italic">
                {t('Applications.about')} {application.profile?.name}:
              </p>
              <p>{application.profile?.about}</p>
            </div>
            <div className="flex flex-wrap items-end justify-between">
              <div>
                <p className="muted mr-2 min-w-[80px] italic">
                  {t('Applications.links')}:
                </p>
                <div className="flex grow gap-1">
                  {links
                    .filter(({ url }) => url !== '')
                    .map((item) => {
                      const Icon = linksIcons[item.name as LinksIconsType]
                      return (
                        <IconButton key={item.name} asChild variant="outlined">
                          <a href={item.url} target="_blank">
                            <Icon />
                          </a>
                        </IconButton>
                      )
                    })}
                </div>
              </div>
              <section className="flex items-center gap-3">
                <ApplicationStateButton
                  variant="filled"
                  role_id={application.role_id}
                  user_id={application.user_id}
                  status={ApplicationStatus.Granted}
                  text={t('Applications.grant')}
                  disabled={application.status === ApplicationStatus.Granted}
                />
                <ApplicationStateButton
                  variant="outlined"
                  role_id={application.role_id}
                  user_id={application.user_id}
                  status={ApplicationStatus.Rejected}
                  text={t('Applications.reject')}
                  disabled={application.status === ApplicationStatus.Rejected}
                />
              </section>
            </div>
          </Card>
        )
      })}
    </>
  )
}

const Loading = () => {
  return new Array(6)
    .fill('')
    .map((_, idx) => <Skeleton key={idx} className="h-60 w-full" />)
}

const LoadingRoleInfo = () => {
  return <Skeleton className="h-14 w-full" />
}
