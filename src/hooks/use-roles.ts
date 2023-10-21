import { useState } from 'react'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { fetcher } from '@/lib/fetcher'
import { roleSchema } from '@/lib/validations/role'

export const useRoles = () => {
  const [isPending, setIsPending] = useState(false)

  const addRoles = async (
    project_id: string,
    roles: z.infer<typeof roleSchema>[]
  ) => {
    try {
      setIsPending(true)

      const values = roles.map((role) => ({
        ...role,
        project_id,
      }))

      const { error } = await fetcher.post({
        url: `${location.origin}/api/roles`,
        body: values,
      })

      if (error) {
        throw error
      }

      return { data: { success: true } }
    } catch (error: any) {
      return { error }
    } finally {
      setIsPending(false)
    }
  }

  const updateRoleStatus = async ({
    id,
    status,
  }: {
    id: string
    status: RoleStatus
  }) => {
    try {
      setIsPending(true)

      const { error } = await fetcher.patch({
        url: `${location.origin}/api/roles`,
        body: { id, status },
      })

      if (error) {
        throw error
      }

      return { data: { success: true } }
    } catch (error: any) {
      return { error }
    } finally {
      setIsPending(false)
    }
  }

  return { addRoles, updateRoleStatus, isPending }
}
