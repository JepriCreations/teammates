import 'server-only'

import { revalidatePath } from 'next/cache'
import { routes } from '@/constants/routes'
import { z } from 'zod'

import { RoleStatus } from '@/types/collections'
import { isPostgressError, PostgressError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { rolesSquema } from '@/lib/validations/project'

export const insertRoles = async (values: z.infer<typeof rolesSquema>) => {
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

    const payload = rolesSquema.safeParse(values)

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
      throw new PostgressError('Error saving the data in the database.', {
        details: insertError.message,
      })
    }

    revalidatePath(routes.HOME)
    return { data, error: null }
  } catch (error) {
    if (isPostgressError(error)) {
      console.log({ error })
      return { data: null, error }
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
      throw new PostgressError('You must log in.', {
        details: error?.message,
      })
    }

    const { data, error: updateError } = await supabase
      .from('roles')
      .update({ status })
      .eq('id', role_id)
      .select('id')
      .single()

    if (updateError) {
      throw new PostgressError('Error updating the data.', {
        details: updateError.message,
      })
    }

    revalidatePath(routes.HOME)
    return { data, error: null }
  } catch (error) {
    if (isPostgressError(error)) {
      console.log({ error })
      return { data: null, error }
    }

    throw error
  }
}
