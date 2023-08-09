import 'server-only'

import { ERROR_CODES } from '@/constants/errors'
import { z } from 'zod'

import { ProjectUpdate } from '@/types/collections'
import { isPostgressError, PostgressError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { slugify } from '@/lib/utils'
import { projectSquema, updateProjectSquema } from '@/lib/validations/project'

export const createProject = async (values: z.infer<typeof projectSquema>) => {
  try {
    const supabase = createRouteHandlerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      throw new PostgressError('You must log in.', {
        details: error?.message,
      })
    }

    const payload = projectSquema.safeParse(values)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      console.log({ payloadErrors: errors })
      throw new PostgressError(
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
        throw new PostgressError('Duplicate Name.', {
          code: ERROR_CODES.DUPLICATE_NAME,
        })
      }
      throw new PostgressError('Error saving the data in the database.', {
        hint: insertError.message,
      })
    }

    return { error: null, data }
  } catch (error) {
    if (isPostgressError(error)) {
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
      throw new PostgressError('You must log in.', {
        details: error?.message,
      })
    }

    const payload = updateProjectSquema.safeParse(values)
    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      console.log({ payloadErrors: errors })
      throw new PostgressError(
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
      throw new PostgressError('Error saving the data in the database.', {
        details: updateError.message,
      })
    }
    return { data: { success: true }, error: null }
  } catch (error) {
    if (isPostgressError(error)) {
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
      throw new PostgressError('You must log in.', {
        details: error?.message,
      })
    }

    if (!id) throw new PostgressError('The id has not been passed.')

    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (deleteError) {
      throw new PostgressError('Error deleting the project.', {
        details: deleteError.message,
      })
    }

    return { data: { success: true }, error: null }
  } catch (error) {
    if (isPostgressError(error)) {
      console.log({ error })
      return { data: null, error }
    }

    throw error
  }
}
