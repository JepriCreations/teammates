'use client'

import { usePathname } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

import { NavigationBar } from '@/components/ui/navigation-bar'
import { Icons } from '@/components/icons'
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
    <NavigationBar className="justify-start">
      <NavigationBar.Container>
        <NavigationBar.Item
          href={ROUTES.STATISTICS(projectId)}
          active={isActive(projectId)}
          icon={<Icons.statistics />}
          label={t('Dashboard.statistics')}
        />
        <NavigationBar.Item
          href={ROUTES.DETAILS(projectId)}
          active={isActive('details')}
          icon={<Icons.projectDetails />}
          label={t('Dashboard.details')}
        />
        <NavigationBar.Item
          href={ROUTES.ROLES(projectId)}
          active={isActive('roles')}
          icon={<Icons.roles />}
          label={t('Dashboard.roles')}
        />
      </NavigationBar.Container>
    </NavigationBar>
  )
}
