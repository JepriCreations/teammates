'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/constants/routes'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ChartBarIcon, ProjectDetailsIcon, RolesIcon } from '@/components/icons'
import { Imagotype } from '@/components/logo'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface ProjectSideBarProps {
  projectId: string
}

export const ProjectSideBar = ({ projectId }: ProjectSideBarProps) => {
  const { t } = useDictionary()
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  pathSegments.splice(0, 2)
  const slug = pathSegments[3]

  const isActive = (key: string) => {
    return slug === key || pathSegments.pop() === key
  }

  return (
    <aside className="sticky top-0 z-40 flex h-[100dvh] w-14 shrink-0 flex-col justify-between overflow-hidden border-r border-outline bg-surface p-2">
      <section className="flex flex-col space-y-3">
        <Link href={routes.PROJECTS}>
          <div className="h-10 w-10 p-1">
            <Imagotype height="100%" />
          </div>
        </Link>

        <ItemTooltip text={t('Dashboard.statistics')}>
          <Button
            asChild
            icon={<ChartBarIcon />}
            variant="ghost"
            size="icon"
            className={cn(
              'opacity-60 transition-all hover:opacity-100',
              isActive(projectId) && 'bg-onSurface/5 opacity-100'
            )}
          >
            <Link href={routes.STATISTICS(projectId)} />
          </Button>
        </ItemTooltip>

        <ItemTooltip text={t('Dashboard.details')}>
          <Button
            asChild
            icon={<ProjectDetailsIcon />}
            variant="ghost"
            size="icon"
            className={cn(
              'opacity-60 transition-all hover:opacity-100',
              isActive('details') && 'bg-onSurface/5 opacity-100'
            )}
          >
            <Link href={routes.DETAILS(projectId)} />
          </Button>
        </ItemTooltip>

        <ItemTooltip text={t('Dashboard.roles')}>
          <Button
            asChild
            icon={<RolesIcon />}
            variant="ghost"
            size="icon"
            className={cn(
              'opacity-60 transition-all hover:opacity-100',
              isActive('roles') && 'bg-onSurface/5 opacity-100'
            )}
          >
            <Link href={routes.ROLES(projectId)} />
          </Button>
        </ItemTooltip>
      </section>
    </aside>
  )
}

const ItemTooltip = ({
  text,
  children,
}: {
  text: string
  children: React.ReactNode
}) => {
  return (
    <div>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
