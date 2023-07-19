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
import { Logo } from '@/components/logo'
import { useDictionary } from '@/components/providers/dictionary-provider'

interface ProjectSideBarProps {
  projectId: string
}

export const ProjectSideBar = ({ projectId }: ProjectSideBarProps) => {
  const { t } = useDictionary()
  const pathname = usePathname()
  const slug = pathname.split('/').pop()

  const isActive = (key: string) => {
    return slug === key
  }

  return (
    <div className="flex w-14 shrink-0 flex-col justify-between overflow-hidden border-r border-border p-2">
      <section className="flex flex-col space-y-3">
        <Link href={routes.PROJECTS}>
          <div className="h-10 w-10 p-1">
            <Logo withText={false} height="100%" />
          </div>
        </Link>

        <ItemTooltip text={t('Dashboard.statistics')}>
          <Button
            asChild
            icon={<ChartBarIcon />}
            variant="ghost"
            className={cn(
              'p-2 opacity-60 transition-all hover:opacity-100',
              isActive(projectId) && 'bg-foreground/5 opacity-100'
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
            className={cn(
              'p-2 opacity-60 transition-all hover:opacity-100',
              isActive('details') && 'bg-foreground/5 opacity-100'
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
            className={cn(
              'p-2 opacity-60 transition-all hover:opacity-100',
              isActive('roles') && 'bg-foreground/5 opacity-100'
            )}
          >
            <Link href={routes.ROLES(projectId)} />
          </Button>
        </ItemTooltip>
      </section>
    </div>
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
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right">
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
