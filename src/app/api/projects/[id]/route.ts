import { NextResponse } from 'next/server'

import { PostgressError } from '@/lib/errors'
import { updateProject } from '@/lib/mutations/projects'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const project = await updateProject(params.id, body)
    return NextResponse.json(project)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgressError(error.message),
      data: null,
    })
  }
}
