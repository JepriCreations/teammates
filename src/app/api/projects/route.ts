import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
import {
  createProject,
  removeProject,
  updateProject,
} from '@/lib/mutations/projects'
import { parseFormData } from '@/lib/utils'
import {
  createProjectSchema,
  updateProjectSchema,
} from '@/lib/validations/project'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const values = parseFormData(formData)

    const payload = createProjectSchema.safeParse(values)

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
    const result = await createProject(payload.data)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const formData = await request.formData()
    const values = parseFormData(formData)

    const { id, ...rest } = values

    if (!id) {
      throw new PostgresError('Project id is required')
    }

    const payload = updateProjectSchema.safeParse(rest)

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

    const result = await updateProject(id, payload.data)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const result = await removeProject(body?.id)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}
