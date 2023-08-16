import 'server-only'

import { ERROR_CODES } from '@/constants/errors'
import { z } from 'zod'

import { ApplicationStatus, ApplicationUpdate } from '@/types/collections'
import { isPostgresError, PostgresError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import {
  applicationSchema,
  updateApplicationSchema,
} from '@/lib/validations/application'

export const createApplication = async (
  values: z.infer<typeof applicationSchema>
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

    const payload = applicationSchema.safeParse(values)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }

    const { data, error: insertError } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        project_id: values.project_id,
        status: values.status ?? ApplicationStatus.StandBy,
        role_id: values.role_id,
      })
      .single()

    if (insertError) {
      if (insertError.code === '23505') {
        throw new PostgresError('Duplicate Application.', {
          code: ERROR_CODES.DUPLICATE_APPLICATION,
        })
      }
      throw new PostgresError('Error saving the data in the database.', {
        hint: insertError.message,
      })
    }

    return { data }
  } catch (error) {
    if (isPostgresError(error)) {
      return { error }
    }

    throw error
  }
}

export const updateApplicationStatus = async (values: ApplicationUpdate) => {
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

    const payload = updateApplicationSchema.safeParse(values)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }

    const { data, error: updateError } = await supabase
      .from('applications')
      .update({
        status: payload.data.status,
      })
      .match({
        role_id: payload.data.role_id,
        user_id: payload.data.user_id,
      })

    if (updateError) {
      throw new PostgresError('Error updating the data in the database.', {
        hint: updateError.message,
      })
    }

    return { data }
  } catch (error) {
    if (isPostgresError(error)) {
      return { error }
    }

    throw error
  }
}
