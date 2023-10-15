'use client'

import { cn } from '@/lib/utils'
import { DashboardAppbar } from '@/components/dashboard/appbar'
import { Icons } from '@/components/icons'
import { Imagotype } from '@/components/logo'
import { useDictionary } from '@/components/providers/dictionary-provider'
import { useNewProjectFormState } from '@/components/providers/new-project-form-provider'

export const FormHeader = () => {
  const { t } = useDictionary()
  const { step } = useNewProjectFormState()

  return (
    <DashboardAppbar>
      <div className="flex items-center gap-3">
        <Imagotype />
        <Icons.angleRightSmall className="text-outline" />
        <p className="text-outline">{t('Dashboard.projects')}</p>
        <Icons.angleRightSmall className="text-outline" />
        <p className={cn(step !== 0 && 'text-outline')}>
          {t('Projects.create_new_project')}
        </p>
        <Icons.angleRightSmall className="text-outline" />
        <p className={cn(step !== 1 && 'text-outline')}>
          {t('Projects.add_available_roles')}
        </p>
      </div>
    </DashboardAppbar>
  )
}
