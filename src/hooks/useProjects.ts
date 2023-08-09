import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/constants/routes'
import { z } from 'zod'

import { Project, ProjectUpdate } from '@/types/collections'
import { PostgressError } from '@/lib/errors'
import { slugify } from '@/lib/utils'
import { createProjectSquema } from '@/lib/validations/project'
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
      }: { error: PostgressError | null; data: { success: true } } =
        await resp.json()

      if (error) {
        throw error
      }

      router.refresh()

      return { error: null, data }
    } catch (error: any) {
      console.log({ error })
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  const create = async (values: z.infer<typeof createProjectSquema>) => {
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

      const { error, data }: { error: PostgressError | null; data: Project } =
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

      return { error, data }
    } catch (error: any) {
      // TODO: Save error to log
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  const remove = async (projectId: string) => {
    try {
      setIsRemoving(true)

      const resp = await fetch(`${location.origin}/api/projects`, {
        method: 'DELETE',
        body: JSON.stringify({ id: projectId }),
      })

      if (!resp.ok) {
        throw new Error('Failed to fetch data')
      }
      router.refresh()
      router.replace(routes.PROJECTS)
    } catch (error) {
      setIsRemoving(false)
      return { error, data: null }
    }
  }

  return { create, update, remove, isPending, isRemoving }
}
