import { routes } from '@/constants/routes'

import { RoleStatus } from '@/types/collections'
import { Translator } from '@/lib/dictionaries'
import { cn, formatDate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { LinkCard } from '@/components/link-card'

interface ProjectCardProps {
  id: string
  name: string
  public: boolean
  updated_at: string
  roles: { status: string }[]
  t: Translator
}

export const ProjectCard = ({
  id,
  name,
  public: isPublic,
  updated_at,
  roles,
  t,
}: ProjectCardProps) => {
  const isActive =
    isPublic && roles.some((role) => role.status === RoleStatus.Open)

  return (
    <LinkCard href={`${routes.PROJECTS}/${id}`}>
      <div className="h-32 px-4 py-3">
        <p className="text-lg">{name}</p>
        <p
          className={cn(
            isActive
              ? 'text-green-500 dark:text-green-300'
              : 'text-muted-foreground'
          )}
        >
          {isActive ? t('active') : t('disabled')}
        </p>
        <span className="absolute inset-x-0 bottom-0 mx-4 my-3 block text-end text-sm text-muted-foreground">
          {formatDate(updated_at)}
        </span>
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
