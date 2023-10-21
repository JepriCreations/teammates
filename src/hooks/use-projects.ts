import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { z } from 'zod'

import { Project } from '@/types/collections'
import { fetcher } from '@/lib/fetcher'
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/lib/validations/project'

export const useProjects = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const update = async (
    id: string,
    values: z.infer<typeof updateProjectSchema>
  ) => {
    try {
      if (!id) throw 'The project id has not been provided.'

      setIsPending(true)
      const { error } = await fetcher.patch({
        url: `${location.origin}/api/projects`,
        data: { id, ...values },
      })

      if (error) {
        throw error
      }

      router.refresh()

      return { data: { success: true } }
    } catch (error: any) {
      console.log({ error })
      return { error }
    } finally {
      setIsPending(false)
    }
  }

  const create = async (values: z.infer<typeof createProjectSchema>) => {
    try {
      setIsPending(true)

      const { error, data } = await fetcher.post<Project>({
        url: `${location.origin}/api/projects`,
        data: values,
      })

      if (error || !data) {
        throw error
      }

      router.refresh()
      return { data }
    } catch (error: any) {
      return { error }
    } finally {
      setIsPending(false)
    }
  }

  const remove = async (project_id: string) => {
    try {
      setIsRemoving(true)

      const { error } = await fetcher.delete({
        url: `${location.origin}/api/projects`,
        body: { id: project_id },
      })

      if (error) {
        throw error
      }

      router.replace(ROUTES.PROJECTS)
      router.refresh()
      return {}
    } catch (error) {
      setIsRemoving(false)
      return { error }
    }
  }

  const addLike = async (project_id: string) => {
    try {
      const { error } = await fetcher.post({
        url: `${location.origin}/api/projects/likes`,
        body: { project_id },
      })

      if (error) {
        throw error
      }

      router.refresh()
      return {}
    } catch (error) {
      return { error }
    }
  }

  const removeLike = async (project_id: string) => {
    try {
      const { error } = await fetcher.delete({
        url: `${location.origin}/api/projects/likes`,
        body: { project_id },
      })

      if (error) {
        throw error
      }

      router.refresh()
      return {}
    } catch (error) {
      return { error }
    }
  }

  return { create, update, remove, addLike, removeLike, isPending, isRemoving }
}
