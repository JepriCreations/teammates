import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
import { addLike, removeLike } from '@/lib/mutations/projects'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await addLike(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
      data: null,
    })
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const result = await removeLike(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
      data: null,
    })
  }
}
