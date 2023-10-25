'use server'

import { z } from 'zod'

import { ERROR_CODES, PostgresError } from '@/lib/errors'
import { createRouteHandlerClient } from '@/lib/supabase-server'
import { profileSchema } from '@/lib/validations/profile'

export const updateProfile = async (values: z.infer<typeof profileSchema>) => {
  const supabase = createRouteHandlerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new PostgresError('Forbidden.', {
      code: ERROR_CODES.UNAUTHENTICATED,
    })
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update(values)
    .eq('id', user.id)

  if (updateError) {
    throw new PostgresError('Error updating profile.', {
      hint: updateError.message,
    })
  }

  return { data: { success: true } }
}
