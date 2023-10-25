import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ROUTES, ROUTES } from '@/constants/routes'
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

  const create = async (values: z.infer<typeof createProjectSchema>) => {
    setIsPending(true)
    return fetcher
      .post<Project>({
        url: location.origin + API_ROUTES.PROJECTS,
        data: values,
      })
      .then((resp) => {
        setIsPending(false)
        return resp
      })
  }

  const update = async (
    id: string,
    values: z.infer<typeof updateProjectSchema>
  ) => {
    setIsPending(true)
    return fetcher
      .patch({
        url: location.origin + API_ROUTES.PROJECTS,
        data: { id, ...values },
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        setIsPending(false)
        return resp
      })
  }

  const remove = async (project_id: string) => {
    setIsRemoving(true)
    return fetcher
      .delete({
        url: location.origin + API_ROUTES.PROJECTS,
        body: { id: project_id },
      })
      .then((resp) => {
        if (!resp.error) {
          router.replace(ROUTES.PROJECTS)
          router.refresh()
          return resp
        }
        setIsRemoving(false)
        return resp
      })
  }

  const addLike = async (project_id: string) => {
    return fetcher
      .post({
        url: location.origin + API_ROUTES.LIKES,
        body: { project_id },
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        return resp
      })
  }

  const removeLike = async (project_id: string) => {
    return fetcher
      .delete({
        url: location.origin + API_ROUTES.LIKES,
        body: { project_id },
      })
      .then((resp) => {
        if (!resp.error) {
          router.refresh()
        }
        return resp
      })
  }

  return { create, update, remove, addLike, removeLike, isPending, isRemoving }
}
