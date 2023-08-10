import { useState } from 'react'
import { z } from 'zod'

import { ApplicationStatus } from '@/types/collections'
import { PostgresError } from '@/lib/errors'
import { applicationSchema } from '@/lib/validations/application'

export const useApplication = () => {
  const [isPending, setIsPending] = useState(false)

  const addApplication = async (values: z.infer<typeof applicationSchema>) => {
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

      return { error: null, data: resp.data }
    } catch (error: any) {
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  //   const updateApplicationStatus = async ({
  //     role_id,
  //     status,
  //   }: {
  //     role_id: string
  //     status: ApplicationStatus
  //   }) => {
  //     try {
  //       setIsPending(true)

  //       const resp = await fetch(`${location.origin}/api/roles`, {
  //         method: 'PATCH',
  //         body: JSON.stringify({ role_id, status }),
  //       })
  //         .then((resp) => resp.json())
  //         .then(
  //           (resp: {
  //             error: PostgresError | null
  //             data: { id: string } | null
  //           }) => resp
  //         )
  //       if (resp.error) {
  //         throw resp.error
  //       }

  //       return { error: null, data: resp.data }
  //     } catch (error: any) {
  //       return { error, data: null }
  //     } finally {
  //       setIsPending(false)
  //     }
  //   }

  return { addApplication, isPending }
}
