'use client'

import { ApplicationStatus } from '@/types/collections'
import { useApplication } from '@/hooks/useApplications'
import { Button } from '@/components/ui/button'

import { useDictionary } from './providers/dictionary-provider'

interface ApplicationStateButtonProps {
  role_id: string
  user_id: string
}

export const ApplicationStateButton = ({
  role_id,
  user_id,
}: ApplicationStateButtonProps) => {
  const { t } = useDictionary()
  const { update, isPending } = useApplication()

  const onClick = async () => {
    const { error } = await update({
      status: ApplicationStatus.Rejected,
      role_id,
      user_id,
    })
    if (error) {
      console.log({ error })
      //TODO: handle error
    }
  }

  return (
    <Button variant="secondary" onClick={onClick} loading={isPending}>
      {t('Applications.reject')}
    </Button>
  )
}
