import { useState } from 'react'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { PostgresError } from '@/lib/errors'
import { roleSchema } from '@/lib/validations/role'

export const useRoles = () => {
  const [isPending, setIsPending] = useState(false)

  const addRoles = async (
    data: z.infer<typeof roleSchema>[],
    project_id: string
  ) => {
    try {
      setIsPending(true)

      const values = data.map((role) => ({
        ...role,
        project_id,
      }))

      const resp = await fetch(`${location.origin}/api/roles`, {
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((resp) => resp.json())
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

  const updateRoleStatus = async ({
    role_id,
    status,
  }: {
    role_id: string
    status: RoleStatus
  }) => {
    try {
      setIsPending(true)

      const resp = await fetch(`${location.origin}/api/roles`, {
        method: 'PATCH',
        body: JSON.stringify({ role_id, status }),
      })
        .then((resp) => resp.json())
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

  return { addRoles, updateRoleStatus, isPending }
}
