import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
import {
  createProject,
  removeProject,
  updateProject,
} from '@/lib/mutations/projects'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createProject(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message)
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const result = await updateProject(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message)
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
      error: new PostgresError(error.message)
    })
  }
}
