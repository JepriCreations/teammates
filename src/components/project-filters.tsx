'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PARAMS_KEYS } from '@/constants/routes'

import { ExperienceLevel, Rewards, WorkMode } from '@/types/collections'
import { createSafeContext } from '@/lib/createSafeContext'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const ProjectFilters = () => {
  const { t } = useDictionary()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const workModeParam = searchParams.getAll(PARAMS_KEYS.WORK_MODE)
  const experienceParam = searchParams.getAll(PARAMS_KEYS.EXPERIENCE)
  const rewardsParam = searchParams.getAll(PARAMS_KEYS.REWARDS)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value.length > 0) {
        const currentValues = params.getAll(name) || []

        if (!currentValues.includes(value)) {
          params.append(name, value)
        } else {
          const newValues = currentValues.filter((v) => v !== value)
          params.delete(name)
          newValues.forEach((val) => params.append(name, val))
        }
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams]
  )

  const handleSelect = (id: string, value: string) => {
    const route = pathname + '?' + createQueryString(id, value)
    router.push(route, { scroll: false })
  }

  return (
    <section className="flex gap-3">
      {/* Work mode */}
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="text">
            {t('Roles.work_mode')}
            <Icons.angleDownSmall />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <CheckBoxGroup id={PARAMS_KEYS.WORK_MODE} param={workModeParam}>
            <CheckBoxItem
              value={WorkMode.Presential}
              onCheck={handleSelect}
              label={t('Roles.Workmode.presential')}
            />
            <CheckBoxItem
              value={WorkMode.Remote}
              onCheck={handleSelect}
              label={t('Roles.Workmode.remote')}
            />
          </CheckBoxGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
      {/* Experience level */}
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="text">
            {t('Roles.experience_level')}
            <Icons.angleDownSmall />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <CheckBoxGroup id={PARAMS_KEYS.EXPERIENCE} param={experienceParam}>
            <CheckBoxItem
              value={ExperienceLevel.Entry}
              onCheck={handleSelect}
              label={t('Roles.Levels.entry')}
            />
            <CheckBoxItem
              value={ExperienceLevel.Intermediate}
              onCheck={handleSelect}
              label={t('Roles.Levels.intermediate')}
            />
            <CheckBoxItem
              value={ExperienceLevel.Expert}
              onCheck={handleSelect}
              label={t('Roles.Levels.expert')}
            />
          </CheckBoxGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
      {/* Rewards */}
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="text">
            {t('Roles.rewards')}
            <Icons.angleDownSmall />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <CheckBoxGroup id={PARAMS_KEYS.REWARDS} param={rewardsParam}>
            <CheckBoxItem
              value={Rewards.Contract}
              onCheck={handleSelect}
              label={t('Roles.Rewards.contract')}
            />
            <CheckBoxItem
              value={Rewards.Credit}
              onCheck={handleSelect}
              label={t('Roles.Rewards.credit')}
            />
            <CheckBoxItem
              value={Rewards.Percent}
              onCheck={handleSelect}
              label={t('Roles.Rewards.percent')}
            />
          </CheckBoxGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    </section>
  )
}

interface CheckBoxGroupValues {
  id: string
  param: string[]
}

const [CheckBoxGroupProvider, useCheckBoxGroup] =
  createSafeContext<CheckBoxGroupValues>({ name: 'CheckBoxGroup' })

const CheckBoxGroup = ({
  id,
  param,
  children,
}: CheckBoxGroupValues & { children: React.ReactNode }) => {
  return (
    <CheckBoxGroupProvider value={{ id, param }}>
      {children}
    </CheckBoxGroupProvider>
  )
}

interface CheckBoxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenu.CheckBoxItem> {
  label: string
}

const CheckBoxItem = ({
  label,
  onCheck,
  value,
  ...props
}: CheckBoxItemProps & {
  onCheck: (id: string, value: string) => void
  value: string
}) => {
  const { id, param } = useCheckBoxGroup()

  return (
    <DropdownMenu.CheckBoxItem
      onSelect={(e) => {
        e.preventDefault()
      }}
      onCheckedChange={id ? () => onCheck(id, value) : props.onCheckedChange}
      checked={param.includes(value)}
      {...props}
    >
      {label}
    </DropdownMenu.CheckBoxItem>
  )
}
