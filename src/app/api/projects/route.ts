import { NextResponse } from 'next/server'

import { PostgressError } from '@/lib/errors'
import { createProject } from '@/lib/mutations/projects'

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
