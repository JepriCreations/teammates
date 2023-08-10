import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
import { createApplication } from '@/lib/mutations/applications'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createApplication(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
      data: null,
    })
  }
}
