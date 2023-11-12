'use client'

import { useRouter } from 'next/navigation'

import { ApplicationStatus } from '@/types/collections'
import { useApplication } from '@/hooks/use-applications'
import { Button, ButtonProps } from '@/components/ui/button'

interface ApplicationStateButtonProps extends ButtonProps {
  text: string
  role_id: string
  user_id: string
  status: ApplicationStatus
}

export const ApplicationStateButton = ({
  text,
  role_id,
  user_id,
  status,
  ...props
}: ApplicationStateButtonProps) => {
  const router = useRouter()
  const { update, isPending } = useApplication()

  const onClick = async () => {
    const { error } = await update({
      status,
      role_id,
      user_id,
    })

    if (error) {
      console.log({ error })
    }

    router.refresh()
    // TODO: Handle success and error
  }

  return (
    <Button onClick={onClick} loading={isPending} {...props}>
      {text}
    </Button>
  )
}
