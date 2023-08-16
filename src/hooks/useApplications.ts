import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { ApplicationStatus, ApplicationUpdate } from '@/types/collections'
import { PostgresError } from '@/lib/errors'
import { applicationSchema } from '@/lib/validations/application'

export const useApplication = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const insert = async (values: z.infer<typeof applicationSchema>) => {
    try {
      setIsPending(true)

      const resp = await fetch(`${location.origin}/api/applications`, {
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((resp) => {
          if (!resp.ok) {
            return { error: 'Fetching error', data: null }
          }
          return resp.json()
        })
        .then(
          (resp: {
            error: PostgresError | null
            data: { id: string } | null
          }) => resp
        )
      if (resp.error) {
        throw resp.error
      }

      return { data: resp.data }
    } catch (error: any) {
      return { error }
    } finally {
      setIsPending(false)
    }
  }

  const update = async (values: ApplicationUpdate) => {
    try {
      setIsPending(true)

      const resp = await fetch(`${location.origin}/api/applications`, {
        method: 'PATCH',
        body: JSON.stringify(values),
      })
        .then((resp) => resp.json())
        .then((resp: { error: PostgresError | null }) => resp)
      if (resp.error) {
        throw resp.error
      }

      router.refresh()
      return {}
    } catch (error: any) {
      return { error }
    } finally {
      setIsPending(false)
    }
  }

  return { insert, update, isPending }
}
