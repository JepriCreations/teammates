'use client'

import Image from 'next/image'
import { ROUTES } from '@/constants/routes'

import { ExperienceLevel, Role } from '@/types/collections'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkCard } from '@/components/link-card'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { RoleIcon } from '@/components/role-icons'

interface ProjectCardProps {
  slug: string
  name: string
  summary: string
  categories: string[]
  updated_at: string
  icon_url: string | null
  roles: Partial<Role>[]
}

export const ProjectCard = ({
  slug,
  name,
  summary,
  categories,
  updated_at,
  icon_url,
  roles,
}: ProjectCardProps) => {
  const { t } = useDictionary()

  return (
    <LinkCard href={ROUTES.PROJECT(slug)}>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="relative size-10 overflow-hidden rounded-xs border border-outline/12 bg-onSurface/10">
            {icon_url && (
              <Image
                fill
                src={icon_url ?? ''}
                alt={name}
                quality={50}
                className="size-full object-contain"
                sizes="(max-width: 768px) 38px"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-title-md leading-none text-onSurface">{name}</p>
            <span className="text-body-sm leading-none text-outline">
              {categories.map((c) => t(`Categories.${c}`)).join(' & ')}
            </span>
          </div>
        </div>

        <p className="text-body-md text-onSurface">{summary}</p>
      </div>
      <div className="flex flex-col items-start gap-3 pb-4 pl-4 text-onSurface sm:flex-row sm:items-end sm:justify-between">
        <ScrollArea className="relative w-full grow">
          <div id="roles-container" className="flex grow gap-3 pr-4">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center gap-2 rounded-full border border-outline px-4 py-1"
              >
                <span className="mr-2 grow truncate">
                  {t(`Roles.${role.name}`)}
                </span>
                {RoleIcon.workModeIcon(role.work_mode!)}
                {RoleIcon.experienceLevelIcon(
                  role.exp_level! as ExperienceLevel
                )}
                {RoleIcon.rewardIcon(role.rewards!)}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <span className="ml-auto shrink-0 px-4 text-sm leading-none text-outline">
          {formatDate(updated_at)}
        </span>
      </div>
    </LinkCard>
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <Card className="relative opacity-50">
      <div className="m-4 mb-2 flex items-center gap-3">
        <Skeleton className="h-10 w-10 shrink-0" />
        <div className="flex grow flex-col gap-1">
          <Skeleton className="h-[18px] w-[20%] min-w-[120px]" />
          <Skeleton className="mt-0.5 h-3 w-[30%] min-w-[140px]" />
        </div>
      </div>
      <Skeleton className="m-4 h-4 w-[80%]" />
      <div className="mb-4">
        <div className="flex grow gap-3 px-4">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
      </div>
    </Card>
  )
}
