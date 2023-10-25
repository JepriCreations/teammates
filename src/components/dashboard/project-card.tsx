import { ROUTES } from '@/constants/routes'

import { RoleStatus } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { cn, formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Icons } from '@/components/icons'
import { LinkCard } from '@/components/link-card'

interface ProjectCardProps {
  id: string
  name: string
  public: boolean
  updated_at: string
  total_views: number
  roles: { status: string }[]
  t: Translator
}

export const ProjectCard = ({
  id,
  name,
  public: isPublic,
  updated_at,
  total_views,
  roles,
  t,
}: ProjectCardProps) => {
  const openRoles = roles.filter(
    (role) => role.status === RoleStatus.Open
  ).length

  return (
    <LinkCard href={ROUTES.STATISTICS(id)}>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-6">
          <p className="grow truncate text-lg">{name}</p>
          <span className="flex shrink-0 origin-top-right items-center gap-2 rounded-full bg-onSurface/5 px-2 py-1 text-sm transition-fadeAndMove group-hover:scale-0 group-hover:opacity-0">
            <Icons.views size={16} />
            {total_views ?? 0}
          </span>
        </div>
        <p className="muted text-sm">{`${openRoles} open roles`}</p>
        <div className="flex items-end justify-between pt-8">
          <p className={cn(isPublic ? 'text-success' : 'muted')}>
            {isPublic ? t('public') : t('hidden')}
          </p>
          <span className="muted text-end text-sm">
            {formatDate(updated_at)}
          </span>
        </div>
      </div>
    </LinkCard>
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <Card className="relative h-[130px] rounded-lg px-4 py-3 opacity-50">
      <Skeleton className="h-4 w-[35%]" />
      <Skeleton className="mt-2 h-3 w-[25%]" />
      <Skeleton className="absolute inset-x-0 bottom-0 mx-4 my-3 ml-auto mt-2 block h-3 w-[25%]" />
    </Card>
  )
}
