import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { z } from 'zod'

import { Project, ProjectUpdate } from '@/types/collections'
import { PostgresError } from '@/lib/errors'
import { createProjectSchema } from '@/lib/validations/project'
import { useSupabase } from '@/components/providers/supabase-provider'

export const useProjects = () => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const update = async (values: ProjectUpdate & { file?: File }) => {
    try {
      if (!values?.id) throw 'The project id has not been provided.'

      setIsPending(true)
      const { file, ...rest } = values
      let valuesToUpdate = { ...rest }

      if (file) {
        const bucketPath = values.id

        const { error: storageError } = await supabase.storage
          .from('icons')
          .update(bucketPath, file, {
            cacheControl: '3600',
            upsert: true,
          })

        if (storageError) throw storageError

        const { data: fileUrl } = supabase.storage
          .from('icons')
          .getPublicUrl(bucketPath)

        valuesToUpdate = Object.assign(
          { icon_url: fileUrl.publicUrl },
          valuesToUpdate
        )
      }

      const resp = await fetch(`${location.origin}/api/projects`, {
        method: 'PATCH',
        body: JSON.stringify(valuesToUpdate),
      })
      if (!resp.ok) {
        throw new Error('Failed to fetch data')
      }

      const {
        error,
        data,
      }: { error: PostgresError | null; data: { success: true } } =
        await resp.json()

      if (error) {
        throw error
      }

      router.refresh()

      return { data }
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
      const { file, ...rest } = values

      const resp = await fetch(`${location.origin}/api/projects`, {
        method: 'POST',
        body: JSON.stringify(rest),
      })

      if (!resp.ok) {
        throw new Error('Failed to fetch data')
      }

      const { error, data }: { error: PostgresError | null; data: Project } =
        await resp.json()

      if (error || !data) {
        throw error
      }

      const bucketPath = data.id

      const { error: storageError } = await supabase.storage
        .from('icons')
        .upload(bucketPath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (!storageError) {
        const { data: fileUrl } = supabase.storage
          .from('icons')
          .getPublicUrl(bucketPath)

        await update({ id: data.id, icon_url: fileUrl.publicUrl })
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

      const resp = await fetch(`${location.origin}/api/projects`, {
        method: 'DELETE',
        body: JSON.stringify({ id: project_id }),
      })

      if (!resp.ok) {
        throw new Error('Failed to fetch data')
      }
      router.refresh()
      router.replace(ROUTES.PROJECTS)
      return {}
    } catch (error) {
      setIsRemoving(false)
      return { error }
    }
  }

  const addLike = async (project_id: string) => {
    try {
      const resp = await fetch(`${location.origin}/api/projects/likes`, {
        method: 'POST',
        body: JSON.stringify({ project_id }),
      })

      if (!resp.ok) {
        throw new Error('Failed to fetch data')
      }
      router.refresh()
      return {}
    } catch (error) {
      return { error }
    }
  }

  const removeLike = async (project_id: string) => {
    try {
      const resp = await fetch(`${location.origin}/api/projects/likes`, {
        method: 'DELETE',
        body: JSON.stringify({ project_id }),
      })

      if (!resp.ok) {
        throw new Error('Failed to fetch data')
      }
      router.refresh()
      return {}
    } catch (error) {
      return { error }
    }
  }

  return { create, update, remove, addLike, removeLike, isPending, isRemoving }
}
