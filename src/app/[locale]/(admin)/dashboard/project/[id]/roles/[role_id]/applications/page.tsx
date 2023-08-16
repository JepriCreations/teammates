import { linksIcons, LinksIconsType } from '@/constants/links'

import { getDictionary } from '@/lib/dictionaries'
import { fetchRoleApplications } from '@/lib/fetching/roles'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ApplicationStateButton } from '@/components/application-state-button'

interface RoleApplicationsProps {
  params: { locale: string; id: string; role_id: string }
}

export default async function RoleApplications({
  params,
}: RoleApplicationsProps) {
  const { t } = await getDictionary(params.locale)
  const { error, data } = await fetchRoleApplications(params.role_id)

  if (error) {
    // TODO: Handle error
    return (
      <div>
        <p>{error.message}</p>
        <p>{error.details}</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <section className="space-y-2">
        <h4 className="pb-2">{t('Roles.role_details')}</h4>
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 sm:grid-cols-5">
          <div>
            <p className="text-title-sm font-medium">{t(`Roles.role`)}</p>
            <p className="muted">{t(`Roles.${data.name}`)}</p>
          </div>

          <div>
            <p className="text-title-sm font-medium">
              {t(`Roles.experience_level`)}
            </p>
            <p className="muted">{t(`Roles.Levels.${data.exp_level}`)}</p>
          </div>

          <div>
            <p className="text-title-sm font-medium">{t(`Roles.rewards`)}</p>
            <p className="muted">
              {data.rewards.map((r) => t(`Roles.Rewards.${r}`)).join(', ')}
            </p>
          </div>
          <div>
            <p className="text-title-sm font-medium">{t(`Roles.work_mode`)}</p>
            <p className="muted">{t(`Roles.Workmode.${data.work_mode}`)}</p>
          </div>
          <div>
            <p className="text-title-sm font-medium">
              {t(`General.created_at`)}
            </p>
            <p className="muted">{formatDate(data.created_at)}</p>
          </div>
        </div>
        <div>
          <p className="text-title-sm font-medium">
            {t(`Roles.role_description`)}
          </p>
          <p className="muted">{data.description}</p>
        </div>
      </section>
      <section className="space-y-4">
        <h4 className="pb-2">{t('Roles.applications')}</h4>
        {data.applications.map((application) => {
          const links: { name: string; url: string }[] =
            JSON.parse(JSON.stringify(application.profile?.links)) ?? []
          return (
            <article
              key={application.created_at_time}
              className="card space-y-2 p-4"
            >
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
                    {links.map((item) => {
                      const Icon = linksIcons[item.name as LinksIconsType]
                      return (
                        <Button
                          asChild
                          size="icon"
                          variant="ghost"
                          className="bg-onSurface/5 hover:bg-onSurface/10"
                        >
                          <a href={item.url}>
                            <Icon />
                          </a>
                        </Button>
                      )
                    })}
                  </div>
                </div>
                <ApplicationStateButton
                  role_id={application.role_id}
                  user_id={application.user_id}
                />
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
