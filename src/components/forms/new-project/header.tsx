'use client'

import { cn } from '@/lib/utils'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { AngleRightSmallIcon } from '@/components/icons'
import { Logo } from '@/components/logo'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

export const FormHeader = () => {
  const { t } = useDictionary()
  const { step } = useNewProjectFormState()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background">
      <DashboardAppbar>
        <div className="flex items-center gap-3">
          <Logo withText={false} />
          <AngleRightSmallIcon className="text-muted-foreground" />
          <p className="text-muted-foreground">{t('Dashboard.projects')}</p>
          <AngleRightSmallIcon className="text-muted-foreground" />
          <p className={cn(step !== 0 && 'text-muted-foreground')}>
            {t('Projects.create_new_project')}
          </p>
          <AngleRightSmallIcon className="text-muted-foreground" />
          <p className={cn(step !== 1 && 'text-muted-foreground')}>
            {t('Projects.add_available_roles')}
          </p>
        </div>
      </DashboardAppbar>
    </header>
  )
}
