import { NextResponse } from 'next/server'

import { newError, PostgresError } from '@/lib/errors'
import { insertRoles, updateRoleStatus } from '@/lib/mutations/roles'
import { rolesSchema, updateRoleStatusSchema } from '@/lib/validations/role'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const payload = rolesSchema.safeParse(body)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }

    const result = await insertRoles(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: newError(error) })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()

    const payload = updateRoleStatusSchema.safeParse(body)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }

    const result = await updateRoleStatus(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: newError(error) })
  }
}
