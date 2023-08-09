'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { PostgressError } from '@/lib/errors'
import { DEBUG } from '@/lib/utils'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useDictionary } from '@/components/providers/dictionary-provider'

export const Error = ({ error }: { error: PostgressError }) => {
  const { t } = useDictionary('Errors')
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
  }, [error])

  return (
    <Alert variant="error">
      <h2>{t('something_went_wrong')}</h2>
      <p>{error.message}</p>
      {DEBUG && <p className="opacity-60">{error.details}</p>}
      <div className="flex justify-end">
        <Button variant="ghost" onClick={() => router.refresh()}>
          {t('another_try')}
        </Button>
      </div>
    </Alert>
  )
}
