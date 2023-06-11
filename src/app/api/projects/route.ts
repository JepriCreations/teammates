import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { projectSquema } from '@/lib/validations/project'
import { RequestError } from '@/lib/errors'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      throw new RequestError({
        message:
          error?.message ??
          'Has not been posible to check if the user is logged in.',
        status: error?.status,
      })
    }

    const payload = projectSquema.safeParse(body)

    if (!payload.success) {
      const errors = payload.error.issues.map((error) => ({
        path: error.path,
        message: error.message,
      }))
      console.log({ errors })
      throw new RequestError({
        message: 'The form validation has not passed.',
      })
    }

    const { data, error: insertError } = await supabase
      .from('projects')
      .insert({
        created_by: session?.user.id,
        ...payload.data,
      })

    if (insertError) {
      throw new RequestError({
        message: insertError.message,
      })
    }

    console.log(JSON.stringify({ payload, data }))

    return NextResponse.json(data)
  } catch (error: any) {
    console.log({ error })
    return new Response(
      JSON.stringify({ message: error.message, form: error?.form }),
      { status: error.status }
    )
  }
}
