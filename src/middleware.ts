import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'
import { routes } from '@/constants/routes'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const isAuthPage = req.nextUrl.pathname.startsWith(routes.LOGIN)

  const supabase = createMiddlewareClient<Database>({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL(routes.PROJECTS, req.url))
    }

    return null
  }

  //   if (!session) {
  //     let from = req.nextUrl.pathname
  //     if (req.nextUrl.search) {
  //       from += req.nextUrl.search
  //     }

  //     return NextResponse.redirect(
  //       new URL(`${routes.LOGIN}?from=${encodeURIComponent(from)}`, req.url)
  //     )
  //   }

  return res
}
