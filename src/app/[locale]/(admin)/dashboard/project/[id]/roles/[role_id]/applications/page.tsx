import { linksIcons, LinksIconsType } from '@/constants/links'

import { getDictionary } from '@/lib/dictionaries'
import { fetchRoleApplications } from '@/lib/fetching/roles'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { IconButton } from '@/components/ui/icon-button'
import { ApplicationStateButton } from '@/components/application-state-button'
import { RoleDetailsAccordion } from '@/components/dashboard/applications/role-details-accordion'
import { Error } from '@/components/error'

interface RoleApplicationsProps {
  params: { locale: string; id: string; role_id: string }
}

export default async function RoleApplications({
  params,
}: RoleApplicationsProps) {
  const { t } = await getDictionary(params.locale)
  const { error, data } = await fetchRoleApplications(params.role_id)

  if (error)
    return (
      <div className="space-y-6 px-4 pb-6 md:px-12">
        <div className="mx-auto w-full max-w-4xl">
          <Error error={error} />
        </div>
      </div>
    )

  const roleData = { ...data, applications: data?.applications.length ?? 0 }

  return (
    <div className="space-y-6 px-4 pb-6 md:px-12">
      <RoleDetailsAccordion data={roleData} />
      <section className="space-y-4">
        <p className="text-title-lg">{t('Roles.applications')}</p>
        {data.applications.map((application) => {
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
                          <IconButton
                            key={item.name}
                            asChild
                            variant="outlined"
                          >
                            <a href={item.url} target="_blank">
                              <Icon />
                            </a>
                          </IconButton>
                        )
                      })}
                  </div>
                </div>
                <ApplicationStateButton
                  role_id={application.role_id}
                  user_id={application.user_id}
                />
              </div>
            </Card>
          )
        })}
      </section>
    </div>
  )
}
