'use client'

import { ApplicationStatus } from '@/types/collections'
import { useApplication } from '@/hooks/use-applications'
import { Button } from '@/components/ui/button'
import { useDictionary } from '@/components/providers/dictionary-provider'

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
    update({
      status: ApplicationStatus.Rejected,
      role_id,
      user_id,
    })
      .then(() => {
        //TODO: handle success
      })
      .catch((error) => {
        console.log({ error })
        //TODO: handle error
      })
  }

  return (
    <Button variant="outlined" onClick={onClick} loading={isPending}>
      {t('Applications.discard')}
    </Button>
  )
}
