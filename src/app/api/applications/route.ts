import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
import {
  createApplication,
  updateApplicationStatus,
} from '@/lib/mutations/applications'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await createApplication(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const result = await updateApplicationStatus(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message),
    })
  }
}
