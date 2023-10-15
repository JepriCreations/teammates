import 'server-only'

import { z } from 'zod'

import { ApplicationStatus, ApplicationUpdate } from '@/types/collections'
import { ERROR_CODES, isPostgresError, PostgresError } from '@/lib/errors'
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

    const { error: insertError } = await supabase.from('applications').insert({
      user_id: user.id,
      project_id: values.project_id,
      status: values.status ?? ApplicationStatus.StandBy,
      role_id: values.role_id,
    })

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

    return { success: true }
  } catch (error) {
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

    const { error: updateError } = await supabase
      .from('applications')
      .update({
        status: values.status,
      })
      .match({
        role_id: values.role_id,
        user_id: values.user_id,
      })

    if (updateError) {
      throw new PostgresError('Error updating the data in the database.', {
        hint: updateError.message,
      })
    }

    return { success: true }
  } catch (error) {
    throw error
  }
}

export const removeApplication = async ({
  user_id,
  role_id,
}: {
  user_id: string
  role_id: string
}) => {
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

    const { error: deleteError } = await supabase
      .from('applications')
      .delete()
      .match({
        role_id,
        user_id,
      })

    if (deleteError) {
      throw new PostgresError('Error deleting the application.', {
        details: deleteError.message,
      })
    }

    return { success: true }
  } catch (error) {
    throw error
  }
}
