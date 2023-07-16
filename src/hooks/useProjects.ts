import { useState } from 'react'
import { z } from 'zod'

import { PostgressError } from '@/lib/errors'
import { projectSquema } from '@/lib/validations/project'
import { useSupabase } from '@/components/providers/supabase-provider'

export const useProjects = () => {
  const { supabase } = useSupabase()
  const [isPending, setIsPending] = useState(false)

  const create = async (data: z.infer<typeof projectSquema>) => {
    try {
      setIsPending(true)
      const { file, ...values } = data
      const bucketPath = `public/${values.name
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
          ...values,
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

  return { create, isPending }
}
