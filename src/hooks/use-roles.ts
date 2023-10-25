import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ROUTES } from '@/constants/routes'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { fetcher } from '@/lib/fetcher'
import { roleSchema } from '@/lib/validations/role'

export const useRoles = () => {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const create = async (
    project_id: string,
    roles: z.infer<typeof roleSchema>[]
  ) => {
    setIsPending(true)

    const values = roles.map((role) => ({
      ...role,
      project_id,
    }))

    return fetcher
      .post({
        url: location.origin + API_ROUTES.ROLES,
        body: values,
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  const updateStatus = async ({
    id,
    status,
  }: {
    id: string
    status: RoleStatus
  }) => {
    setIsPending(true)

    return fetcher
      .patch({
        url: location.origin + API_ROUTES.ROLES,
        body: { id, status },
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  return { create, updateStatus, isPending }
}
