import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
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
      console.log({ payloadErrors: errors })
      throw new PostgresError(
        'The form validation has not passed. Check that all the fields have valid values.'
      )
    }

    const result = await insertRoles(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
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
      console.log({ payloadErrors: errors })
      throw new PostgresError(
        'The form validation has not passed. Check that all the fields have valid values.'
      )
    }

    const result = await updateRoleStatus(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}
