import Image from 'next/image'
import { routes } from '@/constants/routes'

import { Role } from '@/types/collections'
import { getDictionary } from '@/lib/dictionaries'
import { formatDate } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { LinkCard } from './link-card'
import { RoleIcon } from './role-icons'
import { Skeleton } from './ui/skeleton'

interface ProjectCardProps {
  slug: string
  name: string
  summary: string
  categories: string[]
  updated_at: string
  icon_url: string | null
  roles: Partial<Role>[]
  locale: string
}

export const ProjectCard = async ({
  slug,
  name,
  summary,
  categories,
  updated_at,
  icon_url,
  roles,
  locale,
}: ProjectCardProps) => {
  const { t } = await getDictionary(locale)

  return (
    <LinkCard href={routes.PROJECT(slug)}>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 border border-outline bg-onSurface/10">
            {icon_url && (
              <Image
                src={icon_url ?? ''}
                placeholder="empty"
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width: 40px) 100vw"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg leading-none text-onSurface">{name}</p>
            <span className="text-sm leading-none text-outline">
              {categories.join(' & ')}
            </span>
          </div>
        </div>

        <p className="text-onSurface">{summary}</p>
      </div>
      <div className="flex flex-col items-end gap-3 pb-4 text-onSurface sm:flex-row sm:justify-between">
        <ScrollArea className="relative max-w-full grow">
          <div id="roles-container" className="flex gap-3 px-4">
            {roles.map((role) => (
              <div
                key={`${name}-${role.name}`}
                className="flex items-center gap-2 rounded-full border border-outline px-4 py-1"
              >
                <span className="mr-2 grow truncate">
                  {t(`Roles.${role.name}`)}
                </span>
                {RoleIcon.workModeIcon(role.work_mode!)}
                {RoleIcon.experienceLevelIcon(role.exp_level!)}
                {RoleIcon.rewardIcon(role.rewards!)}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-surfaceContainer via-surfaceContainer group-hover:from-surfaceContainerLow group-hover:via-surfaceContainerLow" />
          <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-surfaceContainer via-surfaceContainer group-hover:from-surfaceContainerLow group-hover:via-surfaceContainerLow" />
        </ScrollArea>
        <span className="px-4 text-sm leading-none text-outline">
          {formatDate(updated_at)}
        </span>
      </div>
    </LinkCard>
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="card relative">
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
    </div>
  )
}
