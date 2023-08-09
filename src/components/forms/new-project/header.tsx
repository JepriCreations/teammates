'use client'

import { cn } from '@/lib/utils'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { AngleRightSmallIcon } from '@/components/icons'
import { Imagotype } from '@/components/logo'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

export const FormHeader = () => {
  const { t } = useDictionary()
  const { step } = useNewProjectFormState()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface">
      <DashboardAppbar>
        <div className="flex items-center gap-3">
          <Imagotype />
          <AngleRightSmallIcon className="text-outline" />
          <p className="text-outline">{t('Dashboard.projects')}</p>
          <AngleRightSmallIcon className="text-outline" />
          <p className={cn(step !== 0 && 'text-outline')}>
            {t('Projects.create_new_project')}
          </p>
          <AngleRightSmallIcon className="text-outline" />
          <p className={cn(step !== 1 && 'text-outline')}>
            {t('Projects.add_available_roles')}
          </p>
        </div>
      </DashboardAppbar>
    </header>
  )
}
