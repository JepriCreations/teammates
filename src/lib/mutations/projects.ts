import 'server-only'

import { z } from 'zod'

import { ERROR_CODES, isPostgresError, PostgresError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/utils'
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/lib/validations/project'

export const createProject = async (
  values: z.infer<typeof createProjectSchema>
) => {
  try {
    const supabase = createRouteHandlerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new PostgresError('Unauthenticated', {
        details: error?.message,
        code: ERROR_CODES.UNAUTHENTICATED,
      })
    }

    const slug = slugify(values.name)
    const { file, ...rest } = values

    const { data, error: insertError } = await supabase
      .from('projects')
      .insert({
        slug,
        created_by: user.id,
        ...rest,
      })
      .select('id')
      .single()

    if (insertError) {
      // console.log({ insertError })
      if (insertError.code === '23505') {
        // duplicate key (name)
        throw new PostgresError('Duplicate Name.', {
          code: ERROR_CODES.DUPLICATE_NAME,
        })
      }
      throw new PostgresError('Error saving the data in the database.', {
        hint: insertError.message,
      })
    }

    if (file) {
      const bucketPath = data.id
      const { error: storageError } = await supabase.storage
        .from('icons')
        .upload(bucketPath, file)

      if (storageError) {
        throw new PostgresError('Error saving image.', {
          details: storageError.message,
        })
      }

      const { data: fileUrl } = supabase.storage
        .from('icons')
        .getPublicUrl(bucketPath)

      const icon_url = fileUrl.publicUrl + `?t=${Date.now()}`

      await supabase
        .from('projects')
        .update({
          icon_url,
        })
        .eq('id', data.id)

      return { ...data, icon_url }
    }

    return { data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }

    throw error
  }
}

export const updateProject = async (
  id: string,
  values: z.infer<typeof updateProjectSchema>
) => {
  try {
    if (!id) throw new PostgresError('The id has not been passed.')

    const supabase = createRouteHandlerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new PostgresError('Unauthenticated', {
        details: error?.message,
        code: ERROR_CODES.UNAUTHENTICATED,
      })
    }

    const { file, ...rest } = values
    let valuesToUpdate = Object.assign(rest)

    if (file) {
      const bucketPath = id

      const { error: storageError } = await supabase.storage
        .from('icons')
        .update(bucketPath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (storageError) {
        console.log({ storageError })
        throw new PostgresError('Error saving the data in the database.', {
          details: storageError.message,
        })
      }

      const { data: fileUrl } = supabase.storage
        .from('icons')
        .getPublicUrl(bucketPath)

      valuesToUpdate.icon_url = fileUrl.publicUrl + `?t=${Date.now()}`
    }

    const { error: updateError } = await supabase
      .from('projects')
      .update({
        ...valuesToUpdate,
        updated_at: new Date().toLocaleString(),
      })
      .eq('id', id)

    if (updateError) {
      throw new PostgresError('Error saving the data in the database.', {
        details: updateError.message,
      })
    }

    return { data: { success: true } }
  } catch (error) {
    if (isPostgresError(error)) {
      return { error }
    }

    throw error
  }
}

export const removeProject = async (id: string) => {
  try {
    if (!id) throw new PostgresError('The id has not been passed.')

    const supabase = createRouteHandlerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new PostgresError('Unauthenticated', {
        details: error?.message,
        code: ERROR_CODES.UNAUTHENTICATED,
      })
    }

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (deleteError) {
      throw new PostgresError('Error deleting the project.', {
        details: deleteError.message,
      })
    }

    return { data: { success: true } }
  } catch (error) {
    if (isPostgresError(error)) {
      return { error }
    }

    throw error
  }
}

export const updateProjectViews = async (id: string) => {
  const supabase = createRouteHandlerClient()
  await supabase.rpc('update_or_insert_project_view', {
    p_id: id,
  })
}

export const addLike = async ({ project_id }: { project_id: string }) => {
  try {
    if (!project_id)
      throw new PostgresError('The project id has not been passed.')

    const supabase = createRouteHandlerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new PostgresError('You must log in.', {
        details: error?.message,
        code: ERROR_CODES.UNAUTHENTICATED,
      })
    }

    const { error: insertError } = await supabase.from('project_likes').insert({
      user_id: user.id,
      project_id,
    })

    if (insertError) {
      throw new PostgresError('Error updating likes.', {
        details: insertError.message,
      })
    }

    return { data: { success: true } }
  } catch (error) {
    if (isPostgresError(error)) {
      return { error }
    }

    throw error
  }
}

export const removeLike = async ({ project_id }: { project_id: string }) => {
  try {
    if (!project_id)
      throw new PostgresError('The project id has not been passed.')

    const supabase = createRouteHandlerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new PostgresError('You must log in.', {
        details: error?.message,
        code: ERROR_CODES.UNAUTHENTICATED,
      })
    }

    const { error: deleteError } = await supabase
      .from('project_likes')
      .delete()
      .match({ project_id, user_id: user.id })

    if (deleteError) {
      throw new PostgresError('Error updating likes.', {
        details: deleteError.message,
      })
    }

    return { data: { success: true } }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }

    throw error
  }
}
