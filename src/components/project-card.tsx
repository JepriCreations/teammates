import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/constants/routes'

import { ExperienceLevel, Rewards, Role, WorkMode } from '@/types/collections'
import { formatDate } from '@/lib/utils'
import {
  ArrowUpRightIcon,
  ContractIcon,
  ExperienceLevelIcon,
  PercentCircleIcon,
  PresentialIcon,
  RemoteIcon,
} from '@/components/icons'

interface ProjectCardProps {
  id: string
  name: string
  summary: string
  categories: string[]
  updated_at: string
  icon_url: string | null
  roles: Partial<Role>[]
}

export const ProjectCard = ({
  id,
  name,
  summary,
  categories,
  updated_at,
  icon_url,
  roles,
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
    <div id="card-shadow" className="bg-foreground">
      <Link href={routes.PROJECT(id)} className="group">
        <div
          id="content-container"
          className="relative translate-x-0 translate-y-0 border border-border bg-card p-4 transition group-hover:-translate-x-1 group-hover:-translate-y-1 group-active:translate-x-0 group-active:translate-y-0"
        >
          <div className="mb-2 flex items-center gap-3">
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
              <p className="text-lg leading-none text-card-foreground">
                {name}
              </p>
              <span className="text-sm leading-none text-muted-foreground">
                {categories.join(' & ')}
              </span>
            </div>
          </div>

          <p className="mb-4 text-card-foreground">{summary}</p>

          <div className="flex items-end justify-between text-card-foreground">
            <div id="roles-container" className="flex gap-3">
              {roles.map((role) => (
                <div
                  key={`${name}-${role.name}`}
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-1"
                >
                  <span className="mr-2">{role.name}</span>
                  {workModeIcon[role.work_mode as WorkMode]}
                  <ExperienceLevelIcon
                    level={
                      (role.exp_level as ExperienceLevel) ??
                      ExperienceLevel.Entry
                    }
                    className="h-4 w-4"
                  />
                  {rewardIcon(role.rewards as Rewards[])}
                </div>
              ))}
            </div>
            <span className="text-sm leading-none text-muted-foreground">
              {formatDate(updated_at)}
            </span>
          </div>

          <ArrowUpRightIcon className="absolute right-4 top-4 hidden animate-in fade-in slide-in-from-bottom-1 slide-in-from-left-1 duration-300 group-hover:block" />
        </div>
      </Link>
    </div>
  )
}
