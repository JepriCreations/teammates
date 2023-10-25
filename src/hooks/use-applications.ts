import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ROUTES } from '@/constants/routes'
import { z } from 'zod'

import { ApplicationUpdate } from '@/types/collections'
import { fetcher } from '@/lib/fetcher'
import { applicationSchema } from '@/lib/validations/application'

export const useApplication = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const create = async (values: z.infer<typeof applicationSchema>) => {
    setIsPending(true)
    return fetcher
      .post({
        url: location.origin + API_ROUTES.APPLICATIONS,
        data: values,
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  const update = async (values: ApplicationUpdate) => {
    setIsPending(true)
    return fetcher
      .patch({
        url: location.origin + API_ROUTES.APPLICATIONS,
        data: values,
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  const remove = async ({
    user_id,
    role_id,
  }: {
    user_id: string
    role_id: string
  }) => {
    setIsPending(true)
    return fetcher
      .delete({
        url: location.origin + API_ROUTES.APPLICATIONS,
        body: { user_id, role_id },
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  return { create, update, remove, isPending }
}
