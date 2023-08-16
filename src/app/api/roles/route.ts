import { NextResponse } from 'next/server'

import { PostgresError } from '@/lib/errors'
import { insertRoles, updateRoleStatus } from '@/lib/mutations/roles'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await insertRoles(body)
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
    const result = await updateRoleStatus(body)
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({
      error: new PostgresError(error.message)
    })
  }
}
