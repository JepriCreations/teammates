import { NextResponse } from 'next/server'

import { PostgressError } from '@/lib/errors'
import {
  createProject,
  removeProject,
  updateProject,
} from '@/lib/mutations/projects'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const project = await createProject(body)
    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgressError(error.message),
      data: null,
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const project = await updateProject(body)
    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgressError(error.message),
      data: null,
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const project = await removeProject(body?.id)
    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgressError(error.message),
      data: null,
    })
  }
}
