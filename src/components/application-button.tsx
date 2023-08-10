'use client'

import { ERROR_CODES } from '@/constants/errors'
import { z } from 'zod'

import { applicationSchema } from '@/lib/validations/application'
import { useApplication } from '@/hooks/useApplications'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/button'

import { useDictionary } from './providers/dictionary-provider'
import { useAuth } from './providers/supabase-auth-provider'

export const ApplicationButton = ({
  project_id,
  role_id,
}: z.infer<typeof applicationSchema>) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const { t } = useDictionary()
  const { addApplication, isPending } = useApplication()

  const handleOnClick = async () => {
    const { error } = await addApplication({ project_id, role_id })
    if (error) {
      let error_description = t('Project.Errors.sending_application')

      switch (error.code) {
        case ERROR_CODES.DUPLICATE_APPLICATION: {
          error_description = t('Project.Errors.duplicate_application')
          break
        }
        case ERROR_CODES.UNAUTHENTICATED: {
          error_description = t('Project.Errors.unauthenticated')
          break
        }
        default:
          break
      }

      return toast({
        description: error_description,
        severity: 'error',
      })
    }

    return toast({
      description: t('Project.application_sent'),
      severity: 'success',
    })
  }

  return (
    <>
      <Button
        onClick={handleOnClick}
        disabled={!user || isPending}
        loading={isPending}
        className="ml-auto"
      >
        {t('Project.application_button')}
      </Button>
      {!user && (
        <p className="muted mt-2 text-right text-body-md">
          {t('Project.you_must_login')}
        </p>
      )}
    </>
  )
}
