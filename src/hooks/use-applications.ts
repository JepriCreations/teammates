import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { ApplicationUpdate } from '@/types/collections'
import { fetcher } from '@/lib/fetcher'
import { applicationSchema } from '@/lib/validations/application'

const URL = `${location.origin}/api/applications`

export const useApplication = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const insert = async (values: z.infer<typeof applicationSchema>) => {
    try {
      setIsPending(true)

      const { error } = await fetcher({
        url: URL,
        method: 'POST',
        data: values,
      })

      if (error) {
        throw error
      }

      router.refresh()
    } catch (error: any) {
      throw error
    } finally {
      setIsPending(false)
    }
  }

  const update = async (values: ApplicationUpdate) => {
    try {
      setIsPending(true)

      const { error } = await fetcher({
        url: URL,
        method: 'PATCH',
        data: values,
      })

      if (error) {
        throw error
      }

      router.refresh()
    } catch (error: any) {
      throw error
    } finally {
      setIsPending(false)
    }
  }

  const remove = async ({
    user_id,
    role_id,
  }: {
    user_id: string
    role_id: string
  }) => {
    try {
      setIsPending(true)
      const { error } = await fetcher({
        url: URL,
        method: 'DELETE',
        body: { user_id, role_id },
      })

      if (error) {
        throw error
      }

      router.refresh()
    } catch (error) {
      throw error
    } finally {
      setIsPending(false)
    }
  }

  return { insert, update, remove, isPending }
}
