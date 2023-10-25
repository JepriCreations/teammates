import { NextResponse } from 'next/server'

import { newError, PostgresError } from '@/lib/errors'
import { updateProfile } from '@/lib/mutations/profiles'
import { parseFormData } from '@/lib/utils'
import { profileSchema } from '@/lib/validations/profile'

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData()
    const values = parseFormData(formData)

    const payload = profileSchema.safeParse(values)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }

    const result = await updateProfile(payload.data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: newError(error) })
  }
}
