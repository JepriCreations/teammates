import { useState } from 'react'
import { z } from 'zod'

import { ProjectUpdate } from '@/types/collections'
import { PostgressError } from '@/lib/errors'
import { createProjectSquema } from '@/lib/validations/project'
import { useSupabase } from '@/components/providers/supabase-provider'

export const useProjects = () => {
  const { supabase } = useSupabase()
  const [isPending, setIsPending] = useState(false)

  const create = async (values: z.infer<typeof createProjectSquema>) => {
    try {
      setIsPending(true)
      const { file, ...rest } = values
      const bucketPath = `public/${rest.name
        .toLocaleLowerCase()
        .replaceAll(' ', '')
        .trim()}`

      const { error: storageError } = await supabase.storage
        .from('icons')
        .upload(bucketPath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (storageError) throw storageError

      const { data: fileUrl } = supabase.storage
        .from('icons')
        .getPublicUrl(bucketPath)

      const resp = await fetch(`${location.origin}/api/projects`, {
        method: 'POST',
        body: JSON.stringify({
          ...rest,
          icon_url: fileUrl.publicUrl,
          public: false,
        }),
      })
        .then((resp) => resp.json())
        .then(
          (resp: {
            error: PostgressError | null
            data: { id: string } | null
          }) => resp
        )

      if (resp.error) {
        await supabase.storage.from('icons').remove([bucketPath])
        throw resp.error
      }

      return { error: null, data: resp.data }
    } catch (error: any) {
      // TODO: Save error to log
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  const update = async (
    values: ProjectUpdate & { file?: File },
    projectId: string
  ) => {
    try {
      setIsPending(true)
      const { file, ...rest } = values
      let valuesToUpdate = Object.assign({}, rest)

      if (file && rest.name) {
        const bucketPath = `public/${rest.name
          .toLocaleLowerCase()
          .replaceAll(' ', '')
          .trim()}`

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

        valuesToUpdate = Object.assign({ icon_url: fileUrl.publicUrl }, rest)
      }

      const resp = await fetch(`${location.origin}/api/projects/${projectId}`, {
        method: 'PATCH',
        body: JSON.stringify(valuesToUpdate),
      })
        .then((resp) => resp.json())
        .then(
          (resp: {
            error: PostgressError | null
            data: { success: boolean } | null
          }) => resp
        )

      if (resp.error) {
        throw resp.error
      }

      return { error: null, data: resp.data }
    } catch (error: any) {
      console.log({ error })
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  return { create, update, isPending }
}
