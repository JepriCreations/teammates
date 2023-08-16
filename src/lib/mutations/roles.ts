import 'server-only'

import { revalidatePath } from 'next/cache'
import { ERROR_CODES } from '@/constants/errors'
import { routes } from '@/constants/routes'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { isPostgresError, PostgresError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { rolesSchema } from '@/lib/validations/role'

export const insertRoles = async (values: z.infer<typeof rolesSchema>) => {
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

    const payload = rolesSchema.safeParse(values)

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

    const dataToUpdate = payload.data.map((role) => ({
      ...role,
      status: RoleStatus.Open,
      created_by: user.id,
    }))

    const { data, error: insertError } = await supabase
      .from('roles')
      .insert(dataToUpdate)
      .select('id')

    if (insertError) {
      throw new PostgresError('Error saving the data in the database.', {
        details: insertError.message,
      })
    }

    revalidatePath(routes.HOME)
    return { data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }

    throw error
  }
}

export const updateRoleStatus = async ({
  status,
  role_id,
}: {
  status: string
  role_id: string
}) => {
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

    const { data, error: updateError } = await supabase
      .from('roles')
      .update({ status })
      .eq('id', role_id)
      .select('id')
      .single()

    if (updateError) {
      throw new PostgresError('Error updating the data.', {
        details: updateError.message,
      })
    }

    revalidatePath(routes.HOME)
    return { data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }

    throw error
  }
}
