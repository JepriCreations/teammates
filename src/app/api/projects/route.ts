import { NextResponse } from 'next/server'

import { newError, PostgresError } from '@/lib/errors'
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
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }
    const result = await createProject(payload.data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: newError(error) })
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
      throw new PostgresError('The validation has not passed.', {
        details: JSON.stringify(errors),
      })
    }

    const result = await updateProject(id, payload.data)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: newError(error) })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id = body?.id

    if (!id) {
      throw new PostgresError('Project id is required.')
    }

    const result = await removeProject(id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: newError(error) })
  }
}
