'use client'

import { useSearchParams } from 'next/navigation'
import { PARAMS_KEYS } from '@/constants/routes'

import { ExperienceLevel, Rewards, WorkMode } from '@/types/collections'
import { createSafeContext } from '@/lib/createSafeContext'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const ProjectFilters = () => {
  const { t } = useDictionary()
  const setSearchParams = useSetSearchParams()
  const searchParams = useSearchParams()
  const workModeParam = searchParams.getAll(PARAMS_KEYS.WORK_MODE)
  const experienceParam = searchParams.getAll(PARAMS_KEYS.EXPERIENCE)
  const rewardsParam = searchParams.getAll(PARAMS_KEYS.REWARDS)

  const handleSelect = (id: string, value: string) => {
    setSearchParams({ name: id, value, append: true })
  }

  return (
    <div className="relative w-full overflow-hidden">
      <span className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent to-[16px]" />
      <section className="scrollbar-hidden relative z-0 flex flex-nowrap gap-3 overflow-x-auto px-3">
        {/* Work mode */}
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="text" className="shrink-0">
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
            <Button variant="text" className="shrink-0">
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
            <Button variant="text" className="shrink-0">
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
      <span className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent to-[16px]" />
    </div>
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
