import { NextResponse } from 'next/server'

import { isPostgresError, PostgresError } from '@/lib/errors'
import { addLike, removeLike } from '@/lib/mutations/projects'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const project_id = body?.project_id

    if (!project_id) {
      throw new PostgresError('Project id is required')
    }

    const result = await addLike(project_id)
    return NextResponse.json(result)
  } catch (error: any) {
    if (isPostgresError(error)) {
      return NextResponse.json({ error })
    }
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const project_id = body?.project_id

    if (!project_id) {
      throw new PostgresError('Project id is required')
    }

    const result = await removeLike(project_id)
    return NextResponse.json(result)
  } catch (error: any) {
    if (isPostgresError(error)) {
      return NextResponse.json({ error })
    }
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}
