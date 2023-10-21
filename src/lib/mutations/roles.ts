import 'server-only'

import { revalidatePath } from 'next/cache'
import { ROUTES } from '@/constants/routes'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { ERROR_CODES, isPostgresError, PostgresError } from '@/lib/errors'
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
      throw new PostgresError('Unauthenticated', {
        details: error?.message,
        code: ERROR_CODES.UNAUTHENTICATED,
      })
    }

    const dataToUpdate = values.map((role) => ({
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

    revalidatePath(ROUTES.HOME)
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
  id,
  status,
}: {
  id: string
  status: string
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

    const { data, error: updateError } = await supabase
      .from('roles')
      .update({ status })
      .eq('id', id)
      .select('id')
      .single()

    if (updateError) {
      throw new PostgresError('Error updating the data.', {
        details: updateError.message,
      })
    }

    revalidatePath(ROUTES.HOME)
    return { data }
  } catch (error) {
    if (isPostgresError(error)) {
      console.log({ error })
      return { error }
    }

    throw error
  }
}
