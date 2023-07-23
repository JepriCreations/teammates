import 'server-only'

import { ERROR_CODES } from '@/constants/errors'
import { z } from 'zod'

import { ProjectUpdate } from '@/types/collections'
import { isPostgressError, PostgressError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import {
  projectSquema,
  serverProjectInsertSquema,
} from '@/lib/validations/project'

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

    const payload = serverProjectInsertSquema.safeParse(values)

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

    const { data, error: insertError } = await supabase
      .from('projects')
      .insert({
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

    return { data, error: null }
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

    const payload = serverProjectInsertSquema.safeParse(values)

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
