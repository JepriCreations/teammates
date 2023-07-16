import { useState } from 'react'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { PostgressError } from '@/lib/errors'
import { roleSquema } from '@/lib/validations/project'

export const useRoles = () => {
  const [isPending, setIsPending] = useState(false)

  const addRoles = async (
    data: z.infer<typeof roleSquema>[],
    project_id: string
  ) => {
    try {
      setIsPending(true)

      const values = data.map((role) => ({
        ...role,
        status: RoleStatus.Open,
        project_id,
      }))

      const resp = await fetch(`${location.origin}/api/roles`, {
        method: 'POST',
        body: JSON.stringify(values),
      })
        .then((resp) => resp.json())
        .then(
          (resp: {
            error: PostgressError | null
            data: { id: string } | null
          }) => resp
        )
      if (resp.error) {
        throw resp.error
      }

      return { error: null, data: resp.data }
    } catch (error: any) {
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  return { addRoles, isPending }
}
