'use client'

import { useState } from 'react'

import { Role, RoleStatus } from '@/types/collections'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { TrashIcon } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface RolesForm {
  data: Role[]
}

export const RolesForm = ({ data }: RolesForm) => {
  const { t } = useDictionary('Roles')
  const [roles, setRoles] = useState(data)
  const [editing, setEditing] = useState(false)

  return (
    <>
      <section className="mb-4">
        <Button
          onClick={() => setEditing((prev) => !prev)}
          wrapperClassName="ml-auto"
        >
          Manage
        </Button>
      </section>
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
        }) => {
          return (
            <div
              key={id}
              className="overflow-hidden border border-border bg-card px-6 py-4"
            >
              <div className="relative mb-3">
                <p className="text-xl font-medium">{t(name)}</p>
                <div className="absolute right-0 top-0">
                  {editing ? (
                    <Button
                      onClick={() => console.log({ id })}
                      icon={<TrashIcon />}
                      variant="destructive"
                      wrapperClassName="animate-in slide-in-from-right-5"
                      className="p-2"
                    />
                  ) : (
                    <div className="flex items-center gap-3 animate-in slide-in-from-right-5">
                      <label>{t(`Status.${status}`)}</label>
                      <Switch checked={status === RoleStatus.Open} />
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3 flex gap-3">
                <div className="bg-[#EBD2F8] px-3 py-1 text-black">
                  {t(`Levels.${exp_level}`)}
                </div>
                <div className="bg-[#C5F9CC] px-3 py-1 text-black">
                  {t(`Workmode.${work_mode}`)}
                </div>
                <div className="bg-[#FFFE9F] px-3 py-1 text-black">
                  {rewards.map((rew) => t(`Rewards.${rew}`)).join(', ')}
                </div>
              </div>
              <p className="mb-6">{description}</p>
              <div className="flex justify-between">
                <a href="#" className="hover:underline">
                  10 Applications
                </a>
                <p className="text-muted-foreground">
                  {formatDate(created_at)}
                </p>
              </div>
            </div>
          )
        }
      )}
    </>
  )
}
