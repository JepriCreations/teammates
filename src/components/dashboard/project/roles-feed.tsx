'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

import { Role, RoleStatus } from '@/types/collections'
import { formatDate } from '@/lib/utils'
import { useRoles } from '@/hooks/use-roles'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Chip } from '@/components/ui/chip'
import { IconButton } from '@/components/ui/icon-button'
import { Switch } from '@/components/ui/switch'
import { Tooltip } from '@/components/ui/tooltip'
import { CollapsibleText } from '@/components/collapsible-text'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

const getStatus = (input: boolean) => {
  return input === true ? RoleStatus.Open : RoleStatus.Closed
}

interface RolesFeed {
  projectId: string
  data: Role[]
}

export const RolesFeed = ({ projectId, data }: RolesFeed) => {
  const { toast } = useToast()
  const { t } = useDictionary()
  const [roles, setRoles] = useState(data)
  const { updateStatus } = useRoles()
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    setRoles(data)
  }, [data])

  const onArchive = async (role_id: string) => {
    setUpdating(role_id)
    const { error } = await updateStatus({
      id: role_id,
      status: RoleStatus.Archived,
    })
    if (error) {
      setUpdating(null)
      return toast({
        title: 'Error',
        description: error.message,
        severity: 'error',
      })
    }
  }

  const update = (index: number, newStatus: RoleStatus) => {
    setRoles((prev) => {
      const prevArray = prev.slice(0)
      prevArray.splice(index, 1, { ...prev[index], status: newStatus })
      return prevArray
    })
  }

  const onStatusChange = async (value: boolean, role_id: string) => {
    const index = roles.findIndex((role) => role.id === role_id)
    const status = getStatus(value)
    update(index, status)

    const { error } = await updateStatus({
      id: role_id,
      status,
    })

    if (error) {
      update(index, getStatus(!value))
      return toast({
        title: 'Error',
        description: error.message,
        severity: 'error',
      })
    }
  }

  return (
    <>
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {roles.map(
          ({
            id,
            name,
            description,
            exp_level,
            work_mode,
            rewards,
            status,
            created_at,
            applications,
          }) => {
            return (
              <article key={id}>
                <Card className="overflow-hidden px-6 py-4">
                  <div className="mb-3 flex w-full flex-col-reverse flex-wrap justify-between gap-x-3 sm:flex-row sm:flex-nowrap sm:items-center">
                    <p className="truncate text-title-lg">
                      {t(`Roles.${name}`)}
                    </p>
                    <div className="flex grow items-center justify-end gap-3">
                      <div className="flex items-center gap-3 animate-in zoom-in-0">
                        <label className="text-label-lg">
                          {t(`Roles.Status.${status}`)}
                        </label>
                        <Switch
                          onCheckedChange={(value) => onStatusChange(value, id)}
                          checked={status === RoleStatus.Open}
                        />
                      </div>
                      <Tooltip.Provider delayDuration={500}>
                        <Tooltip>
                          <Tooltip.Trigger asChild>
                            <IconButton
                              loading={updating === id}
                              variant="standard"
                              className="h-12 w-12 rounded-full"
                              onClick={() => onArchive(id)}
                            >
                              <Icons.archive />
                            </IconButton>
                          </Tooltip.Trigger>
                          <Tooltip.Content side="right">
                            <span className="text-body-sm">
                              {t('Roles.archive')}
                            </span>
                          </Tooltip.Content>
                        </Tooltip>
                      </Tooltip.Provider>
                    </div>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2">
                    <Chip>
                      <Chip.Label>{t(`Roles.Levels.${exp_level}`)}</Chip.Label>
                    </Chip>
                    <Chip>
                      <Chip.Label>
                        {t(`Roles.Workmode.${work_mode}`)}
                      </Chip.Label>
                    </Chip>
                    <Chip>
                      <Chip.Label>
                        {' '}
                        {rewards
                          .map((rew) => t(`Roles.Rewards.${rew}`))
                          .join(', ')}
                      </Chip.Label>
                    </Chip>
                  </div>

                  <div className="mb-3">
                    <CollapsibleText>{description}</CollapsibleText>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      asChild={applications > 0}
                      variant="text"
                      disabled={applications === 0}
                    >
                      <Link href={ROUTES.APPLICATIONS(projectId, id)}>
                        {`${applications} ${
                          applications > 1
                            ? t('Roles.applications')
                            : t('Roles.application')
                        }`}
                      </Link>
                    </Button>
                    <p className="text-outline">{formatDate(created_at)}</p>
                  </div>
                </Card>
              </article>
            )
          }
        )}
      </section>
    </>
  )
}
