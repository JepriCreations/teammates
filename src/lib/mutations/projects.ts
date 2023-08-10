import 'server-only'

import { ERROR_CODES } from '@/constants/errors'
import { z } from 'zod'

import { ProjectUpdate } from '@/types/collections'
import { isPostgresError, PostgresError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/utils'
import { projectSchema, updateProjectSchema } from '@/lib/validations/project'

export const createProject = async (values: z.infer<typeof projectSchema>) => {
  try {
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

    const payload = projectSchema.safeParse(values)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      console.log({ payloadErrors: errors })
      throw new PostgresError(
        'The form validation has not passed. Check that all the fields have valid values.'
      )
    }
    const slug = slugify(payload.data.name)

    const { data, error: insertError } = await supabase
      .from('projects')
      .insert({
        slug,
        created_by: user.id,
        ...payload.data,
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

    return { error: null, data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { data: null, error }
    }

    throw error
  }
}

export const updateProject = async (values: ProjectUpdate) => {
  try {
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

    const payload = updateProjectSchema.safeParse(values)
    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      console.log({ payloadErrors: errors })
      throw new PostgresError(
        'The form validation has not passed. Check that all the fields have valid values.'
      )
    }

    const { error: updateError } = await supabase
      .from('projects')
      .update({
        ...values,
        updated_at: new Date().toISOString().toLocaleString(),
      })
      .eq('id', values.id)

    if (updateError) {
      throw new PostgresError('Error saving the data in the database.', {
        details: updateError.message,
      })
    }
    return { data: { success: true }, error: null }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { data: null, error }
    }

    throw error
  }
}

export const removeProject = async (id: string) => {
  try {
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

    if (!id) throw new PostgresError('The id has not been passed.')

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (deleteError) {
      throw new PostgresError('Error deleting the project.', {
        details: deleteError.message,
      })
    }

    return { data: { success: true }, error: null }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { data: null, error }
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

    const insertPromise = supabase.from('project_likes').insert({
      profile_id: user.id,
      project_id,
    })
    const updatePromise = supabase.rpc('increment', {
      table_name: 'projects',
      row_id: project_id,
      field_name: 'likes',
      x: 1,
    })

    const [insert, update] = await Promise.all([insertPromise, updatePromise])

    const promiseError = insert.error || update.error
    if (promiseError) {
      throw new PostgresError('Error updating likes.', {
        details: promiseError.message,
      })
    }

    return { error: null, data: update.data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { data: null, error }
    }

    throw error
  }
}

export const removeLike = async ({ project_id }: { project_id: string }) => {
  try {
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

    const removePromise = supabase
      .from('project_likes')
      .delete()
      .match({ project_id, profile_id: user.id })
    const updatePromise = supabase.rpc('increment', {
      table_name: 'projects',
      row_id: project_id,
      field_name: 'likes',
      x: -1,
    })

    const [remove, update] = await Promise.all([removePromise, updatePromise])

    const promiseError = remove.error || update.error
    if (promiseError) {
      throw new PostgresError('Error updating likes.', {
        details: promiseError.message,
      })
    }

    return { error: null, data: update.data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { data: null, error }
    }

    throw error
  }
}
