import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { ProjectUpdate } from '@/types/collections'
import { PostgressError } from '@/lib/errors'
import { slugify } from '@/lib/utils'
import { createProjectSquema } from '@/lib/validations/project'
import { useSupabase } from '@/components/providers/supabase-provider'

export const useProjects = () => {
  const { supabase } = useSupabase()
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const update = async (values: ProjectUpdate & { file?: File }) => {
    try {
      if (!values?.id) throw 'The project id has not been provided.'

      setIsPending(true)
      const { file, ...rest } = values
      const slug = rest.name ? slugify(rest.name) : undefined
      let valuesToUpdate = Object.assign({ slug }, rest)

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

      router.refresh()

      return { error: null, data: resp.data }
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
      const slug = slugify(rest.name)

      const resp = await fetch(`${location.origin}/api/projects`, {
        method: 'POST',
        body: JSON.stringify({
          ...rest,
          slug,
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

      if (resp.error || !resp.data) {
        throw resp.error
      }

      const bucketPath = resp.data.id

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

        await update({ id: resp.data.id, icon_url: fileUrl.publicUrl })
      }

      router.refresh()

      return { error: null, data: resp.data }
    } catch (error: any) {
      // TODO: Save error to log
      return { error, data: null }
    } finally {
      setIsPending(false)
    }
  }

  return { create, update, isPending }
}
