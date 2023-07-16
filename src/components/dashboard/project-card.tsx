import { routes } from '@/constants/routes'

import { RoleStatus } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { cn, formatDate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { ViewsIcon } from '@/components/icons'
import { LinkCard } from '@/components/link-card'

interface ProjectCardProps {
  id: string
  name: string
  public: boolean
  updated_at: string
  views: number
  roles: { status: string }[]
  t: Translator
}

export const ProjectCard = ({
  id,
  name,
  public: isPublic,
  updated_at,
  views,
  roles,
  t,
}: ProjectCardProps) => {
  const openRoles = roles.filter(
    (role) => role.status === RoleStatus.Open
  ).length

  return (
    <LinkCard href={`${routes.PROJECTS}/${id}`}>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-6">
          <p className="grow truncate text-lg">{name}</p>
          <span className="flex shrink-0 origin-top-right items-center gap-2 rounded-full bg-foreground/5 px-2 py-1 text-sm transition-slide group-hover:scale-0 group-hover:opacity-0 dark:bg-foreground/10">
            <ViewsIcon size={16} />
            {views}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{`${openRoles} open roles`}</p>
        <div className="flex items-end justify-between pt-8">
          <p
            className={cn(
              isPublic
                ? 'text-green-500 dark:text-green-300'
                : 'text-muted-foreground'
            )}
          >
            {isPublic ? t('public') : t('hidden')}
          </p>
          <span className="text-end text-sm text-muted-foreground">
            {formatDate(updated_at)}
          </span>
        </div>
      </div>
    </LinkCard>
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="relative h-[130px] border border-muted bg-card px-4 py-3">
      <Skeleton className="h-4 w-[35%] rounded-none" />
      <Skeleton className="mt-2 h-3 w-[25%] rounded-none" />
      <Skeleton className="absolute inset-x-0 bottom-0 mx-4 my-3 ml-auto mt-2 block h-3 w-[25%] rounded-none" />
    </div>
  )
}
