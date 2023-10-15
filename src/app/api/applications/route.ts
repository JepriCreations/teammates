import { NextResponse } from 'next/server'

import { isPostgresError, PostgresError } from '@/lib/errors'
import {
  createApplication,
  removeApplication,
  updateApplicationStatus,
} from '@/lib/mutations/applications'
import { parseFormData } from '@/lib/utils'
import {
  applicationSchema,
  updateApplicationSchema,
} from '@/lib/validations/application'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const values = parseFormData(formData)

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

    const result = await createApplication(payload.data)
    return NextResponse.json(result)
  } catch (error: any) {
    if (isPostgresError(error)) {
      return NextResponse.json(error, { status: 500 })
    }

    return NextResponse.json(new PostgresError(error.message), { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData()
    const values = parseFormData(formData)

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

    const result = await updateApplicationStatus(payload.data)
    return NextResponse.json(result)
  } catch (error: any) {
    if (isPostgresError(error)) {
      return NextResponse.json(error, { status: 500 })
    }

    return NextResponse.json(new PostgresError(error.message), { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const user_id: string | undefined = body?.user_id
    const role_id: string | undefined = body?.role_id

    if (!user_id || !role_id) {
      throw new PostgresError('Data has not been passed.')
    }

    const result = await removeApplication({ user_id, role_id })
    return NextResponse.json(result)
  } catch (error: any) {
    if (isPostgresError(error)) {
      return NextResponse.json(error, { status: 500 })
    }

    return NextResponse.json(new PostgresError(error.message), { status: 500 })
  }
}
