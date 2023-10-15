'use client'

import { Role } from '@/types/collections'
import { formatDate } from '@/lib/utils'
import { Accordion } from '@/components/ui/accordion'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const RoleDetailsAccordion = ({ data }: { data: Role }) => {
  const { t } = useDictionary()

  return (
    <Accordion type="single" collapsible>
      <Accordion.Item
        value="role-details"
        className="rounded-lg border-none bg-surfaceContainer px-4"
      >
        <Accordion.Trigger>
          <p className="text-title-md">{t('Roles.role_details')}</p>
        </Accordion.Trigger>
        <Accordion.Content>
          <section className="space-y-2">
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
                <p className="text-title-sm font-medium">
                  {t(`Roles.rewards`)}
                </p>
                <p className="muted">
                  {data.rewards.map((r) => t(`Roles.Rewards.${r}`)).join(', ')}
                </p>
              </div>
              <div>
                <p className="text-title-sm font-medium">
                  {t(`Roles.work_mode`)}
                </p>
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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}
