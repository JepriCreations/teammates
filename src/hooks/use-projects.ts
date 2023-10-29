import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_ROUTES, ROUTES } from '@/constants/routes'
import useSWRInfinite from 'swr/infinite'
import { z } from 'zod'

import { Project, Role } from '@/types/collections'
import { fetcher } from '@/lib/fetcher'
import { FetchProjectParams } from '@/lib/fetching/projects'
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/lib/validations/project'

type ProjectResponse = {
  projects: {
    roles: Partial<Role>[]
    id: string
    slug: string
    updated_at: string
    name: string
    summary: string
    categories: string[]
    icon_url: string
    public: boolean
  }[]
  projectCount: number
  totalNumberOfProjects: number
  nextPage: number
  isLast: boolean
}

type SWRInfiniteKeyLoader = (
  pageIndex: number,
  previousPage: any,
  params: FetchProjectParams
) => string | null

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPage, params) => {
  // reached the end
  if (previousPage && !previousPage.data) return null

  let queryParams = Object.assign({ page: pageIndex })

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      queryParams[key] = value
    }
  }

  return API_ROUTES.PROJECTS + `?query=${JSON.stringify(queryParams)}`
}

export const useFetchProjects = (params: FetchProjectParams) => {
  const [isLoading, setIsLoading] = useState(true)

  const {
    data: fetchData,
    size,
    setSize,
    error,
    isValidating,
  } = useSWRInfinite(
    (pageIndex, prevPage) => getKey(pageIndex, prevPage, params),
    params
      ? (url: string) =>
          fetcher.get<ProjectResponse>({
            url,
          })
      : null
  )

  const loadMore = () => {
    setIsLoading(false)
    setSize(size + 1)
  }

  const data = fetchData?.flatMap((i) => i?.data?.projects ?? [])
  const isLast = fetchData?.flat().some((i) => i?.data?.isLast)

  return {
    data,
    error,
    isLoading: isLoading && isValidating,
    isValidating,
    loadMore,
    isLast,
  }
}

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
