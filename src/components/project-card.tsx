import Image from 'next/image'
import { routes } from '@/constants/routes'

import { ExperienceLevel, Rewards, Role, WorkMode } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { formatDate } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  ContractIcon,
  ExperienceLevelIcon,
  PercentCircleIcon,
  PresentialIcon,
  RemoteIcon,
} from '@/components/icons'

import { LinkCard } from './link-card'
import { Skeleton } from './ui/skeleton'

interface ProjectCardProps {
  id: string
  name: string
  summary: string
  categories: string[]
  updated_at: string
  icon_url: string | null
  roles: Partial<Role>[]
  t: Translator
}

export const ProjectCard = ({
  id,
  name,
  summary,
  categories,
  updated_at,
  icon_url,
  roles,
  t,
}: ProjectCardProps) => {
  const workModeIcon = {
    [WorkMode.Presential]: <PresentialIcon className="h-4 w-4" />,
    [WorkMode.Remote]: <RemoteIcon className="h-4 w-4" />,
  }

  const rewardIcon = (rewards: Rewards[]) => {
    if (
      rewards.includes(Rewards.Percent) &&
      rewards.includes(Rewards.Contract)
    ) {
      return <PercentCircleIcon className="h-4 w-4" />
    }
    //   TODO: Change Combo Icon

    if (rewards.includes(Rewards.Percent)) {
      return <PercentCircleIcon className="h-4 w-4" />
    }

    if (rewards.includes(Rewards.Contract)) {
      return <ContractIcon className="h-4 w-4" />
    }

    return null
  }

  return (
    <LinkCard href={routes.PROJECT(id)}>
      <div className="m-4 mb-2 flex items-center gap-3">
        <div className="relative h-10 w-10 border border-border bg-foreground/10">
          {icon_url && (
            <Image
              src={icon_url ?? ''}
              placeholder="empty"
              alt={name}
              fill
              className="object-contain"
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-lg leading-none text-card-foreground">{name}</p>
          <span className="text-sm leading-none text-muted-foreground">
            {categories.join(' & ')}
          </span>
        </div>
      </div>

      <p className="m-4 text-card-foreground">{summary}</p>

      <div className="mb-4 flex flex-col items-end gap-3 text-card-foreground sm:flex-row sm:justify-between">
        <ScrollArea className="relative max-w-full grow">
          <div id="roles-container" className="flex gap-3 px-4">
            {roles.map((role) => (
              <div
                key={`${name}-${role.name}`}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-1"
              >
                <span className="mr-2 grow truncate">
                  {t(`Roles.${role.name}`)}
                </span>
                {workModeIcon[role.work_mode as WorkMode]}
                <ExperienceLevelIcon
                  level={
                    (role.exp_level as ExperienceLevel) ?? ExperienceLevel.Entry
                  }
                  className="h-4 w-4"
                />
                {rewardIcon(role.rewards as Rewards[])}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-card via-card" />
          <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-card via-card" />
        </ScrollArea>
        <span className="mx-4 text-sm leading-none text-muted-foreground">
          {formatDate(updated_at)}
        </span>
      </div>
    </LinkCard>
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="relative border border-muted bg-card">
      <div className="m-4 mb-2 flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-none" />
        <div className="flex grow flex-col gap-1">
          <Skeleton className="h-[18px] w-[20%] min-w-[120px] rounded-none" />
          <Skeleton className="mt-0.5 h-3 w-[30%] min-w-[140px] rounded-none" />
        </div>
      </div>
      <Skeleton className="m-4 h-4 w-[80%] rounded-none" />
      <div className="mb-4">
        <div className="flex grow gap-3 px-4">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
      </div>
    </div>
  )
}
